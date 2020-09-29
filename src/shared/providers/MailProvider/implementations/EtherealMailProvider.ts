import TemplateMailProviderInterface from '@shared/providers/TemplateMailProvider/interfaces/TemplateMailProviderINterface';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import MailProviderDTO from '../dtos/MailProviderDTO';

import MailProviderInterface from '../interfaces/MailProviderInterface';

@injectable()
export default class EtherealMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor(
    @inject('TemplateMailProvider')
    private templateMailProvider: TemplateMailProviderInterface,
  ) {
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

  public async sendMail({
    to,
    from,
    subject,
    templateContent,
  }: MailProviderDTO): Promise<void> {
    const sentMail = await this.client.sendMail({
      from: {
        name: from?.name ?? 'Go Barber Team',
        address: from?.email ?? 'no-reply@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.templateMailProvider.parse(templateContent),
    });

    console.log('Message sent: %s', sentMail.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(sentMail));
  }
}
