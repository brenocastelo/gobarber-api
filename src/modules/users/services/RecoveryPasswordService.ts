import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import MailProviderInterface from '@shared/providers/MailProvider/interfaces/MailProviderInterface';

import UsersRepositoryInterface from '../repositories/UsersRepository';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';

interface Request {
  email: string;
}

@injectable()
export default class RecoveryPasswordService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,

    @inject('MailProvider')
    private mailProvider: MailProviderInterface,

    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepositoryInterface,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generateToken(user.id);

    await this.mailProvider.sendMail(
      email,
      `Let's recovery your password. Use this token: ${token}`,
    );
  }
}
