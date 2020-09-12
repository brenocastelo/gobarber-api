import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public constructor(private userRepository: UsersRepositoryInterface) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
