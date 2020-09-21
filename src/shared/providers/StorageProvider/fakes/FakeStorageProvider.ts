import StorageProviderInterface from '../interfaces/StorageProviderInterface';

export default class FakeStorageProvider implements StorageProviderInterface {
  storageFiles: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storageFiles.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storageFiles.findIndex(
      fileName => fileName === file,
    );

    this.storageFiles.splice(fileIndex, 1);
  }
}
