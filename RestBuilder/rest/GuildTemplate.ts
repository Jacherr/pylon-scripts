export default class GuildTemplate {
    private options: discord.Guild.IGuildOptions = {};
  
    public setAfkChannel(id: discord.Snowflake) {
      this.options.afkChannelId = id;
      return this;
    }
  
    public disableAfkTimeout() {
      this.options.afkChannelId = null;
      return this;
    }
  
    public setAfkTimeout(value: number) {
      if (![60, 300, 900, 1800, 3600].includes(value)) {
        throw new RangeError(
          'AFK timeout must be one of 60, 300, 900, 1800 or 3600 seconds.'
        );
      }
      this.options.afkTimeout = value;
      return this;
    }
  
    public setBanner(banner: string) {
      this.options.banner = banner;
      return this;
    }
  
    public removeBanner() {
      this.options.banner = null;
      return this;
    }
  
    public setDefaultMessageNotifications(
      level: discord.Guild.NotificationsLevel
    ) {
      if (![0, 1].includes(level)) {
        throw new RangeError('The notification level must be either 0 or 1.');
      }
      this.options.defaultMessageNotifications = level;
      return this;
    }
  
    public setExplicitContentFilterLevel(
      level: discord.Guild.ExplicitContentFilterLevel
    ) {
      if (![0, 1, 2].includes(level)) {
        throw new RangeError(
          'The explicit content filter level must be between 0 and 2 inclusive.'
        );
      }
      this.options.explicitContentFilter = level;
      return this;
    }
  
    public disableExplicitCOntentFilter() {
      this.options.explicitContentFilter = 0;
      return this;
    }
  
    public setIcon(icon: string) {
      this.options.icon = icon;
      return this;
    }
  
    public removeIcon() {
      this.options.icon = null;
      return this;
    }
  
    public setName(name: string) {
      if (name.length > 32 || name.length < 2) {
        throw new RangeError(
          'The guild name must be less than 32 characters and at least 2 characters'
        );
      }
      this.options.name = name;
      return this;
    }
  
    public setRegion(region: discord.Guild.Region) {
      this.options.region = region;
      return this;
    }
  
    public setSplash(splash: string) {
      this.options.splash = splash;
      return this;
    }
  
    public removeSplash() {
      this.options.splash = null;
      return this;
    }
  
    public setSystemChannel(id: discord.Snowflake) {
      this.options.systemChannelId = id;
      return this;
    }
  
    public removeSystemChannel() {
      this.options.systemChannelId = null;
      return this;
    }
  
    public setVerificationLevel(level: discord.Guild.VerificationLevel) {
      if (![0, 1, 2, 3, 4].includes(level)) {
        throw new RangeError(
          'The verification level must be between 0 and 4 inclusive.'
        );
      }
      this.options.verificationLevel = level;
      return this;
    }
  
    public async editGuild(guild: discord.Guild) {
      const newGuild = await guild.edit(this.options);
      return newGuild;
    }
  }
  