import ChannelTemplate from './ChannelTemplate';
import BanTemplate from './BanTemplate';
import GuildTemplate from './GuildTemplate';

export default class RestBuilder {
  public createChannelTemplate() {
    const channel = new ChannelTemplate();
    return channel;
  }

  public createBanTemplate() {
    const ban = new BanTemplate();
    return ban;
  }

  public createGuildTemplate() {
    const guild = new GuildTemplate();
    return guild;
  }
}
