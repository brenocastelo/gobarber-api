import MailProviderDTO from '../dtos/MailProviderDTO';

export default interface MailProviderInterface {
  sendMail(data: MailProviderDTO): Promise<void>;
}
