import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    /*  const fakeUserRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUserRepository); */

    const user = await createUserService.execute({
      name: 'LeBron James',
      email: 'king@email.com',
      password: '23232323',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('king@email.com');
  });

  it('should not be able to create a user whe the email is already registered', async () => {
    /*  const fakeUserRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUserRepository); */

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
