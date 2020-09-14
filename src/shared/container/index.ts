import { container } from 'tsyringe';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);
