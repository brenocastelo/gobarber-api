import MailProviderDTO from '../dtos/MailProviderDTO';
import MailProviderInterface from '../interfaces/MailProviderInterface';

export default class FakeMailProvider implements MailProviderInterface {
  private messages: MailProviderDTO[] = [];

  public async sendMail(message: MailProviderDTO): Promise<void> {
    this.messages.push(message);
  }
}
