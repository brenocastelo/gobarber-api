import { inject, injectable } from 'tsyringe';
import path from 'path';

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

    const templatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recovery password',
      templateContent: {
        file: templatePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
