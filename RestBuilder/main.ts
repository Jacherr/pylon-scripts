import RestBuilder from './rest/RestBuilder';

const restBuilder = new RestBuilder();

discord.on('MESSAGE_CREATE', async (message: discord.Message) => {
  const prefix = '.';
  const [command, ...args] = message.content.slice(prefix.length).split(' ');
  if (command === 'eval') {
    let res: string;
    try {
      res = JSON.stringify(await Promise.resolve(eval(args.join(' '))));
    } catch (e) {
      return message.reply(e.message);
    }
    return message.reply(res !== undefined ? res : 'undefined');
  }
  if (command === 'aeval') {
    let res: string;
    try {
      res = JSON.stringify(
        await Promise.resolve(eval(`(async () => { ${args.join(' ')} })()`))
      );
    } catch (e) {
      return message.reply(e.message);
    }
    return message.reply(res !== undefined ? res : 'undefined');
  }
});
