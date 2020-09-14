import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
