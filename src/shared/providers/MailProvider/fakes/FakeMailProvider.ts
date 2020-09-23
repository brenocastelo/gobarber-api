import MailProviderInterface from '../interfaces/MailProviderInterface';

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements MailProviderInterface {
  private messages: Message[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
