import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public constructor(private userRepository: UsersRepositoryInterface) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(email);

    if (emailAlreadyRegistered) {
      throw new AppError('This email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
