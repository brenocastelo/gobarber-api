export default interface MailProviderInterface {
  sendMail(to: string, body: string): Promise<void>;
}
