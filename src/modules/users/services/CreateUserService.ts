import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRespository = getRepository(User);

    const emailAlreadyRegistered = await userRespository.findOne({
      where: { email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError('This email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRespository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRespository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
