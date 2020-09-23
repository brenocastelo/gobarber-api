import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import UserTokenRepositoryInterface from '../UserTokenRepositoryInterface';

export default class FakeUserTokensRepository
  implements UserTokenRepositoryInterface {
  private userTokens: UserToken[] = [];

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid(), token: uuid(), user_id });
    this.userTokens.push(userToken);

    return userToken;
  }
}
