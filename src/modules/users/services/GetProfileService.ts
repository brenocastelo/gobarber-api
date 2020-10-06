import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '../repositories/UsersRepository';

@injectable()
export default class GetProfileService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const profile = await this.userRepository.findById(user_id);

    if (!profile) {
      throw new AppError('Profile not found');
    }

    return profile;
  }
}
