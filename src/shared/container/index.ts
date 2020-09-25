import { container } from 'tsyringe';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';

import '@modules/users/providers';
import '@shared/providers';
import UserTokenRepositoryInterface from '@modules/users/repositories/UserTokenRepositoryInterface';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<UserTokenRepositoryInterface>(
  'UserTokenRepository',
  UsersTokenRepository,
);
