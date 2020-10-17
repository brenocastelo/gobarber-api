import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: UsersRepositoryInterface;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
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
});
