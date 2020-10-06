import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import StorageProviderInterface from '@shared/providers/StorageProvider/interfaces/StorageProviderInterface';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: UsersRepositoryInterface;
let fakeStorageProvider: StorageProviderInterface;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUserRepository.create({
      email: 'lebron@email.com',
      password: '232323',
      name: 'Lebron',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update user avatr when user nonexist', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'fdfsdff-4rer',
        avatarFileName: 'avatr.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'lebron@email.com',
      password: '232323',
      name: 'Lebron',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
