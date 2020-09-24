import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';

interface Request {
  token: string;
  password: string;
}

const TIME_IN_HOUR_TO_EXPIRE_TOKEN = 2;

export default class ResetPasswordService {
  public constructor(
    private userRepository: UsersRepositoryInterface,
    private userTokenRepository: UserTokenRepositoryInterface,
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findUserByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tokenExpiredDate = addHours(
      userToken.created_at,
      TIME_IN_HOUR_TO_EXPIRE_TOKEN,
    );

    if (isAfter(Date.now(), tokenExpiredDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}
