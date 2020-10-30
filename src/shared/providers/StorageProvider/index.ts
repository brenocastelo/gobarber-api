import { container } from 'tsyringe';
import storageConfig from '@config/storage';

import DiskStorageProvider from './implementations/DIskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import StorageProviderInterface from './interfaces/StorageProviderInterface';

const storageProvider = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  storageProvider[storageConfig.driver],
);
