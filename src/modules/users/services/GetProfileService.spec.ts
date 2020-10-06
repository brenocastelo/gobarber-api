import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import GetProfileService from './GetProfileService';

let fakeUserRepository: UsersRepositoryInterface;
let getProfileService: GetProfileService;

describe('GetProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    getProfileService = new GetProfileService(fakeUserRepository);
  });

  it('should get profile information', async () => {
    const user = await fakeUserRepository.create({
      email: 'king@email.com',
      name: 'Lebron James',
      password: '232323',
    });

    const profile = await getProfileService.execute(user.id);

    expect(profile.email).toBe('king@email.com');
    expect(profile.name).toBe('Lebron James');
  });

  it('should not get profile information when user id non exist', async () => {
    await expect(
      getProfileService.execute('3423424234234'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
