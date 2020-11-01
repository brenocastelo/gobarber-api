import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(email);

    if (emailAlreadyRegistered) {
      throw new AppError('This email is already registered');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
