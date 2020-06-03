const xpGainCooldowns: Map<string, number> = new Map();
const levelScale = 0.15;
const levelsKv = new pylon.KVNamespace('xp');

// Role Rewards are defined here
// To define Role Rewards, fill out these arrays (e.g. [10, '698221664164380722'])
// This will grant the role with ID 698221664164380722 at level 10
const roleRewards: Map<number, discord.Snowflake> = new Map([
  [10, ''],
  [20, ''],
  [30, '']
]);

// Set this to true if you want previous role rewards to be kept
const stackRewards = false;

const commands = new discord.command.CommandGroup({
  defaultPrefix: '..',
  description: 'Pylon Leveling Commands',
  additionalPrefixes: ['<@270148059269300224>', '<@!270148059269300224> '] // Mention prefixes
});

commands.raw(
  {
    name: 'rank',
    aliases: ['level'],
    onError: (ctx, error) => {
      ctx.message.reply(`Something went wrong... ${error.message}`);
    }
  },

  async (message) => {
    const userXp = <number>await levelsKv.get(message.author.id);

    if (!userXp) {
      return message.reply("You don't have any xp yet");
    } else {
      const level = levelScale * Math.sqrt(userXp);
      const nextLevel = Math.floor(level) + 1;
      const requiredXp = Math.floor((nextLevel / levelScale) ** 2) - userXp;
      return message.reply(
        `You have ${userXp} xp and are level ${Math.floor(level)}.
You need ${requiredXp} xp for level ${nextLevel}.`
      );
    }
  }
);

commands.raw(
  {
    name: 'top',
    aliases: ['leaderboard', 'lb'],
    onError: (ctx, error) => {
      ctx.message.reply(`Something went wrong... ${error.message}`);
    }
  },
  async (message) => {
    const keys = await levelsKv.list();
    const entries = [];
    for (const key of keys) {
      entries.push([key, await levelsKv.get(key)]);
    }
    const top10 = entries
      .sort((a, b) => <number>b[1] - <number>a[1])
      .slice(0, 9);
    return message.reply({
      content: `**Top 10 users:**\n${top10
        .map((e) => `<@${e[0]}> - ${e[1]} xp`)
        .join('\n')}`,
      allowedMentions: {}
    });
  }
);

discord.registerEventHandler(discord.Event.MESSAGE_CREATE, async (message) => {
  if (!message.author || message.author.bot || !message.member) return;
  const userXp = <number | undefined>await levelsKv.get(message.author.id);
  const userLevel = levelScale * Math.sqrt(userXp || 0);
  const xpGain: number = 10 + parseInt((Math.random() * 15).toFixed(0));
  if (
    !xpGainCooldowns.get(message.author.id) ||
    (xpGainCooldowns.get(message.author.id) &&
      <number>xpGainCooldowns.get(message.author.id) < Date.now())
  ) {
    if (userXp === undefined) {
      await levelsKv.put(message.author.id, xpGain);
    } else {
      if (
        Math.floor(levelScale * Math.sqrt(userXp + xpGain)) >
        Math.floor(userLevel)
      ) {
        const newLevel = Math.round(levelScale * Math.sqrt(userXp + xpGain));
        await handleLevelUp(message, newLevel);
      }
      await levelsKv.put(message.author.id, userXp + xpGain);
    }
    xpGainCooldowns.set(message.author.id, Date.now() + 60000);
  }
});

async function handleLevelUp(message: discord.Message, newLevel: number) {
  const newRole = roleRewards.get(newLevel);
  if (newRole) {
    await message.member?.addRole(newRole);
    if (!stackRewards) {
      message.member?.roles.forEach(async (role) => {
        const roleRewardIds = Array.from(roleRewards).map((rr) => rr[1]);
        if (roleRewardIds.includes(role))
          await message.member?.removeRole(role);
      });
    }
  }
  await message.reply(
    `${message.author?.toMention()} you are now level ${newLevel}`
  );
}
