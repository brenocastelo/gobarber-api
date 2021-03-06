import UserToken from '../infra/typeorm/entities/UserToken';

export default interface UserTokenRepositoryInterface {
  generateToken(user_id: string): Promise<UserToken>;
  findUserByToken(token: string): Promise<UserToken | undefined>;
}
