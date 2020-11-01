import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListProvidersService {
  public constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepositoryInterface,
    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  public async execute(userId: string): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`,
    );

    if (!providers) {
      providers = await this.userRepository.findAllProviders({
        except_user_id: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, providers);
    }

    return providers;
  }
}
