export interface BanTemplateOptions {
    guild: discord.Guild;
  }
  
  export default class BanTemplate {
    private options: discord.Guild.IGuildBanOptions = {};
  
    public setReason(reason: string) {
      this.options.reason = reason;
      return this;
    }
  
    public setDeleteMessageDays(days: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) {
      if (days < 0 || days > 7) {
        throw new RangeError(
          'The amount of days to remove messages must be between 0 and 7 days inclusive.'
        );
      }
      this.options.deleteMessageDays = days;
      return this;
    }
  
    public setRaw(options: discord.Guild.IGuildBanOptions) {
      this.options = options;
      return this;
    }
  
    public async banUser(userId: discord.Snowflake, guild: discord.Guild) {
      if (!userId) {
        throw new ReferenceError('There was no specified user to ban.');
      }
      await guild.createBan(userId, this.options);
    }
  }
  