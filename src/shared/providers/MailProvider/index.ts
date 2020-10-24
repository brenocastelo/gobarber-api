import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import MailProviderInterface from './interfaces/MailProviderInterface';

const mailDriver = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  mailDriver[mailConfig.driver],
);
