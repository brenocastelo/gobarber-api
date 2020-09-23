import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import MailProviderInterface from '@shared/providers/MailProvider/interfaces/MailProviderInterface';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import UsersRepositoryInterface from '../repositories/UsersRepository';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';
import RecoveryPasswordService from './RecoveryPasswordService';

let fakeMailProvider: MailProviderInterface;
let fakeUserRepository: UsersRepositoryInterface;
let fakeUserTokenRepository: UserTokenRepositoryInterface;
let recoveryPasswordService: RecoveryPasswordService;

describe('RecoveryPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();

    recoveryPasswordService = new RecoveryPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should send email to recovery password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUserRepository.create({
      name: 'Davis',
      email: 'davies@email.com',
      password: '123456',
    });

    await recoveryPasswordService.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not send email whe user does not exist', async () => {
    await expect(
      recoveryPasswordService.execute({ email: 'james@email.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token to recovery password', async () => {
    const user = await fakeUserRepository.create({
      name: 'James',
      email: 'king@email.com',
      password: '232323',
    });

    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generateToken');
    await recoveryPasswordService.execute({ email: user.email });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
