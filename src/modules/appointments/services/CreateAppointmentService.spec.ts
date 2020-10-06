import AppError from '@shared/errors/AppError';

import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: IAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppoinmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '3242343',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3242343');
  });
  it('should not be able to create a new appointment at the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '3242343',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '3242343',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
