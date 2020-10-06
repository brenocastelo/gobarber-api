import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

@injectable()
export default class UpdateUserService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    newPassword,
    currentPassword,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userToBeUpdated = await this.userRepository.findByEmail(email);

    if (userToBeUpdated && userToBeUpdated.id !== user_id) {
      throw new AppError('This email already exists');
    }

    if (newPassword && !currentPassword) {
      throw new AppError(
        'To update password, the current password must be informed',
      );
    }

    if (newPassword && currentPassword) {
      const isCurrentPasswordCorrect = await this.hashProvider.compareHash(
        currentPassword,
        user.password,
      );

      if (!isCurrentPasswordCorrect) {
        throw new AppError('Current password is wrong');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    user.email = email;
    user.name = name;

    return await this.userRepository.save(user);
  }
}
