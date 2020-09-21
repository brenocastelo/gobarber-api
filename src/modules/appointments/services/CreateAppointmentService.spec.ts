import AppError from '@shared/errors/AppError';

import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppoinmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '3242343',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3242343');
  });
  it('should not be able to create a new appointment at the same time', async () => {
    const fakeAppointmentRepository = new FakeAppoinmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

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
