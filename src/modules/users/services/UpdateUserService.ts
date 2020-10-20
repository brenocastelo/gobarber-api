import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  current_password?: string;
  new_password?: string;
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
    new_password,
    current_password,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userToBeUpdated = await this.userRepository.findByEmail(email);

    if (userToBeUpdated && userToBeUpdated.id !== user_id) {
      throw new AppError('This email already exists');
    }

    if (new_password && !current_password) {
      throw new AppError(
        'To update password, the current password must be informed',
      );
    }

    if (new_password && current_password) {
      const isCurrentPasswordCorrect = await this.hashProvider.compareHash(
        current_password,
        user.password,
      );

      if (!isCurrentPasswordCorrect) {
        throw new AppError('Current password is wrong');
      }

      user.password = await this.hashProvider.generateHash(new_password);
    }

    user.email = email;
    user.name = name;

    return await this.userRepository.save(user);
  }
}
