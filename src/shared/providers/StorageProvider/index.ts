import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DIskStorageProvider';
import StorageProviderInterface from './interfaces/StorageProviderInterface';

container.registerSingleton<StorageProviderInterface>(
  'StorageInterface',
  DiskStorageProvider,
);
