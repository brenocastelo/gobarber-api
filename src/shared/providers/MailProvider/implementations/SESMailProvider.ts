import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import TemplateMailProviderInterface from '@shared/providers/TemplateMailProvider/interfaces/TemplateMailProviderINterface';
import mailConfig from '@config/mail';
import mail from '@config/mail';
import MailProviderInterface from '../interfaces/MailProviderInterface';
import MailProviderDTO from '../dtos/MailProviderDTO';

@injectable()
export default class SESMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor(
    @inject('TemplateMailProvider')
    private templateMailProvider: TemplateMailProviderInterface,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({ apiVersion: '2010-12-01' }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateContent,
  }: MailProviderDTO): Promise<void> {
    const { name, email } = mail.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      subject,
      to: {
        name: to.name,
        address: to.email,
      },
      html: await this.templateMailProvider.parse(templateContent),
    });
  }
}
