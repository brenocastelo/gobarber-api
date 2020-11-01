import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: IAppointmentRepository;
let fakeNotificationRepository: NotificationRepositoryInterface;
let fakeCacheProvider: CacheProviderInterface;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 11, 11).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 9, 11, 15),
      provider_id: '3242343',
      user_id: '121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3242343');
    expect(appointment.user_id).toBe('121212');
  });

  it('should not be able to create a new appointment at the same time', async () => {
    const appointmentDate = new Date(2020, 9, 12, 16);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 11, 11).getTime();
    });

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '3242343',
      user_id: '121212',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '3242343',
        user_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past dates', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 11, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 9, 10, 9),
        provider_id: '3242343',
        user_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment when user_id and provider_id are equal', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 11, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 9, 11, 13),
        provider_id: '3242343',
        user_id: '3242343',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment when hour is before 8pm and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 11, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 9, 12, 7),
        provider_id: '3242343',
        user_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 9, 12, 18),
        provider_id: '3242343',
        user_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
