import fs from 'fs';
import path from 'path';

import storageConfig from '@config/storage';
import StorageProviderInterface from '../interfaces/StorageProviderInterface';

export default class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    const { tmpFolderPath, uploadFolderPath } = storageConfig;

    await fs.promises.rename(
      path.resolve(tmpFolderPath, file),
      path.resolve(uploadFolderPath, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadFolderPath, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(file);
  }
}
