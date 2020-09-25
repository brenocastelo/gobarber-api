import UserTokenRepositoryInterface from '@modules/users/repositories/UserTokenRepositoryInterface';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UsersTokenRepository
  implements UserTokenRepositoryInterface {
  private ormRepository: Repository<UserToken>;

  public constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
