import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListProvidersService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,
  ) {}

  public async execute(userId: string): Promise<User[]> {
    const providers = await this.userRepository.findAllProviders({
      except_user_id: userId,
    });

    return providers;
  }
}
