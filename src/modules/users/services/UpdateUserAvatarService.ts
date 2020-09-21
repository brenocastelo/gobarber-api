import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import StorageProviderInterface from '@shared/providers/StorageProvider/interfaces/StorageProviderInterface';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,

    @inject('StorageProvider')
    private storageProvider: StorageProviderInterface,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
