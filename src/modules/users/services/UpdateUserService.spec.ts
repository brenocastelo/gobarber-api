import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: UsersRepositoryInterface;
let fakeHashProvider: HashProviderInterface;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should update user info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Anthony Davis',
      email: 'davis@email.com',
      password: '212121',
    });

    const updatedUser = await updateUserService.execute({
      email: 'davislakers@email.com',
      name: 'Davis',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('Davis');
    expect(updatedUser.email).toBe('davislakers@email.com');
  });

  it('should not update user when user are not authenticated', async () => {
    await expect(
      updateUserService.execute({
        email: 'davis@email.com',
        name: 'James',
        user_id: 'xxxxxxxxxxxxxx',
        current_password: '222222',
        new_password: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update user when has informed email already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Anthony Davis',
      email: 'davis@email.com',
      password: '212121',
    });

    const user = await fakeUsersRepository.create({
      name: 'Lebron James',
      email: 'king@email.com',
      password: '232323',
    });

    await expect(
      updateUserService.execute({
        email: 'davis@email.com',
        name: 'James',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Anthony Davis',
      email: 'davis@email.com',
      password: '212121',
    });

    const updatedUser = await updateUserService.execute({
      email: 'davis@email.com',
      name: 'James',
      user_id: user.id,
      current_password: '212121',
      new_password: '232323',
    });

    expect(updatedUser.password).toBe('232323');
  });

  it('should not update password when current password was not informed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Anthony Davis',
      email: 'davis@email.com',
      password: '212121',
    });

    await expect(
      updateUserService.execute({
        email: 'davis@email.com',
        name: 'James',
        user_id: user.id,
        new_password: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be update password when informed current password has is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Anthony Davis',
      email: 'davis@email.com',
      password: '212121',
    });

    await expect(
      updateUserService.execute({
        email: 'davis@email.com',
        name: 'James',
        user_id: user.id,
        current_password: '222222',
        new_password: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
