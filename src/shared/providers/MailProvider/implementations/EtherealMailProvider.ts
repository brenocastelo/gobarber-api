import nodemailer, { Transporter } from 'nodemailer';

import MailProviderInterface from '../interfaces/MailProviderInterface';

export default class EtherealMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const sentMail = await this.client.sendMail({
      from: 'GoBarber Team <no-reply@gobarber.com>',
      to,
      subject: 'Recovery password',
      text: body,
    });

    console.log('Message sent: %s', sentMail.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(sentMail));
  }
}
