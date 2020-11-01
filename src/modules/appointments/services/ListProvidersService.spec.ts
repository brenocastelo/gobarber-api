import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: UsersRepositoryInterface;
let fakeCacheProvider: CacheProviderInterface;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should list providers', async () => {
    const fakeUser1 = await fakeUsersRepository.create({
      email: 'king@email.com',
      name: 'Lebron',
      password: '232323',
    });

    const fakeUser2 = await fakeUsersRepository.create({
      email: 'davis@email.com',
      name: 'Anthony',
      password: '212121',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'kawhi@email.com',
      name: 'Lonard',
      password: '222222',
    });

    const providers = await listProvidersService.execute(loggedUser.id);

    expect(providers).toEqual([fakeUser1, fakeUser2]);
    expect(providers.length).toBe(2);
  });

  /**
   *  coloquei esse teste porque o test coverage estava indicando que a situação
   *  em que havia dados em cache e a consulta no postgres não era feita não
   * estava sendo testada
   */
  it('should list providers from cached data', async () => {
    const fakeUser1 = await fakeUsersRepository.create({
      email: 'king@email.com',
      name: 'Lebron',
      password: '232323',
    });

    const fakeUser2 = await fakeUsersRepository.create({
      email: 'davis@email.com',
      name: 'Anthony',
      password: '212121',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'kawhi@email.com',
      name: 'Lonard',
      password: '222222',
    });

    const findAllProvidersMock = jest.spyOn(
      fakeUsersRepository,
      'findAllProviders',
    );
    jest.spyOn(fakeCacheProvider, 'recover').mockImplementationOnce(
      (): Promise<User[]> => {
        /**
         * o método recover retorna uma Promise, então o retorno do mock implementation
         *  também deve ser uma promise
         *  */
        return Promise.resolve([fakeUser1, fakeUser2]);
      },
    );

    const providers = await listProvidersService.execute(loggedUser.id);
    expect(providers.length).toBe(2);
    expect(findAllProvidersMock).not.toBeCalled();
  });
});
