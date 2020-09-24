import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import HashProviderInterface from '../providers/interfaces/HashProviderImplementation';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: UsersRepositoryInterface;
let fakeUserTokenRepository: UserTokenRepositoryInterface;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: HashProviderInterface;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should reset user password', async () => {
    // given
    const user = await fakeUserRepository.create({
      name: 'James',
      email: 'king@email.com',
      password: '232323',
    });

    const userToken = await fakeUserTokenRepository.generateToken(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    // when
    await resetPasswordService.execute({
      token: userToken.token,
      password: '232321',
    });

    // expect
    expect(generateHash).toBeCalledWith('232321');
    expect(user.password).toBe('232321');
  });

  it('should not reset password with non-existent token was provided', async () => {
    await expect(
      resetPasswordService.execute({
        token: '111-2222-34-23rr',
        password: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password when user non-exist', async () => {
    const { token } = await fakeUserTokenRepository.generateToken('1223434');

    await expect(
      resetPasswordService.execute({ token, password: '34343' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password when token has expired', async () => {
    // given
    const user = await fakeUserRepository.create({
      name: 'James',
      email: 'king@email.com',
      password: '232323',
    });

    const { token } = await fakeUserTokenRepository.generateToken(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date();

      const tokenExpiredDate = currentDate.setHours(currentDate.getHours() + 3);

      return tokenExpiredDate;
    });

    // expect
    await expect(
      resetPasswordService.execute({
        token,
        password: '232321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
