import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DIskStorageProvider';
import StorageProviderInterface from './interfaces/StorageProviderInterface';

const storageStrategy = {
  disk: DiskStorageProvider,
};

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  storageStrategy.disk,
);
