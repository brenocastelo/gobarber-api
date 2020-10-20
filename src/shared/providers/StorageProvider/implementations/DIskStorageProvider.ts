import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import StorageProviderInterface from '../interfaces/StorageProviderInterface';

export default class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    const { tmpFolderPath, uploadFolderPath } = uploadConfig;

    await fs.promises.rename(
      path.resolve(tmpFolderPath, file),
      path.resolve(uploadFolderPath, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolderPath, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(file);
  }
}
