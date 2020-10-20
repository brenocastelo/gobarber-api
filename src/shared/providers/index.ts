import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProviderInterface from './MailProvider/interfaces/MailProviderInterface';
import DiskStorageProvider from './StorageProvider/implementations/DIskStorageProvider';
import StorageProviderInterface from './StorageProvider/interfaces/StorageProviderInterface';
import HandlebarsTemplateProvider from './TemplateMailProvider/implementation/HandlebarsTemplateProvider';
import TemplateMailProviderInterface from './TemplateMailProvider/interfaces/TemplateMailProviderINterface';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<TemplateMailProviderInterface>(
  'TemplateMailProvider',
  HandlebarsTemplateProvider,
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
