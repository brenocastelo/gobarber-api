import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import CreateUserService from './CreateUserService';

let createUserService: CreateUserService;
let fakeUserRepository: UsersRepositoryInterface;
let fakeHashProvider: HashProviderInterface;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'LeBron James',
      email: 'king@email.com',
      password: '23232323',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('king@email.com');
  });

  it('should not be able to create a user whe the email is already registered', async () => {
    await createUserService.execute({
      name: 'LeBron James',
      email: 'king@email.com',
      password: '23232323',
    });

    await expect(
      createUserService.execute({
        name: 'LeBron James',
        email: 'king@email.com',
        password: '23232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
