import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import mime from 'mime';

import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';
import StorageProviderInterface from '../interfaces/StorageProviderInterface';

/**
 * TODO:
 * [x] - Delete method
 * [x] - Use driver according enviroment variable
 *    - updat uploa config to  check storage driver
 * [] - return avatar url to with image from s3
 *  - passar o ontent-type no objeto que será criado no bucket
 */

export default class S3StorageProvider implements StorageProviderInterface {
  private client: S3;

  constructor() {
    this.client = new aws.S3();
  }

  public async saveFile(file: string): Promise<string> {
    const { fileContent, contentType } = await this.getFileContent(file);

    await this.client
      .putObject({
        Bucket: 'gobarber-users-profile-picture',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'gobarber-users-profile-picture',
        Key: file,
      })
      .promise();
  }

  private async getFileContent(
    file: string,
  ): Promise<{ fileContent: Buffer; contentType: string }> {
    const filePath = path.resolve(storageConfig.tmpFolderPath, file);
    const contentType = mime.getType(filePath);

    if (!contentType) {
      throw new AppError('File not found');
    }

    // ler o conteudo do arquivo
    const fileContent = await fs.promises.readFile(filePath);

    return {
      fileContent,
      contentType,
    };
  }
}
