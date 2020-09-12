import { container } from 'tsyringe';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositories';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
