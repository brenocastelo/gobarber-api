import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: UsersRepositoryInterface;
let fakeHashProvider: HashProviderInterface;
let fakeCacheProvider: CacheProviderInterface;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await createUserService.execute({
      name: 'LeBron James',
      email: 'king@email.com',
      password: '23232323',
    });

    const response = await authenticateUserService.execute({
      email: 'king@email.com',
      password: '23232323',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be not able to authenticate nonexistent user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'breno@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user when passwords don't match", async () => {
    await createUserService.execute({
      name: 'Lebron',
      email: 'king@email.com',
      password: '232323',
    });

    await expect(
      authenticateUserService.execute({
        email: 'king@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
