import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import UserTokenRepositoryInterface from '../UserTokenRepositoryInterface';

export default class FakeUserTokensRepository
  implements UserTokenRepositoryInterface {
  private userTokens: UserToken[] = [];

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.userTokens.push(userToken);

    return userToken;
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return userToken;
  }
}
