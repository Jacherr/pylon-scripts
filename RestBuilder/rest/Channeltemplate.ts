export interface ChannelTemplateOptions {
    guild: discord.Guild;
  }
  
  export default class ChannelTemplate {
    private options: discord.Guild.CreateChannelOptions = { type: 0 };
  
    public setType(type: number) {
      if (![0, 2, 3].includes(type)) {
        throw new RangeError('The given type must be one of 0, 2, or 3.');
      }
      this.options.type = type;
      return this;
    }
  
    public setName(name: string) {
      if (name.length < 2 || name.length > 100) {
        throw new RangeError(
          'The channel name length must be between 2 and 100 characters inclusive.'
        );
      }
      this.options.name = name;
      return this;
    }
  
    public setOverwrites(overwrites: discord.Channel.IPermissionOverwrite[]) {
      this.options.permissionOverwrites = overwrites;
      return this;
    }
  
    /* public setBitrate(bitrate: number) {
      if (this.options.type != 2) {
        throw new TypeError('The channel is not a voice channel.');
      } else {
        this.options.bitrate = bitrate;
      }
    } */
  
    public setCategory(category: string) {
      this.options.parentId = category;
      return this;
    }
  
    public setRaw(options: discord.Guild.CreateChannelOptions) {
      this.options = options;
      return this;
    }
  
    public async createChannel(guild: discord.Guild) {
      const channel = await guild.createChannel(this.options);
      return channel;
    }
  }
  