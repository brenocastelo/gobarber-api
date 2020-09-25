import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProviderInterface from './MailProvider/interfaces/MailProviderInterface';
import DiskStorageProvider from './StorageProvider/implementations/DIskStorageProvider';
import StorageProviderInterface from './StorageProvider/interfaces/StorageProviderInterface';

container.registerSingleton<StorageProviderInterface>(
  'StorageInterface',
  DiskStorageProvider,
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  new EtherealMailProvider(),
);
