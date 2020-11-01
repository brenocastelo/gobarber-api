import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import Appointment from '../infra/typeorm/entities/Appointment';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: IAppointmentRepository;
let fakeCacheProvider: CacheProviderInterface;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should list all appointments from a provider in a day', async () => {
    const firstAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 17, 13, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    const secondAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 17, 14, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    const providersAppointments = await listProviderAppointmentsService.execute(
      {
        year: 2020,
        month: 11,
        day: 17,
        provider_id: '01',
      },
    );

    expect(providersAppointments).toEqual([
      firstAppointment,
      secondAppointment,
    ]);
  });

  it('should list all appointments from a provider in a day from cache', async () => {
    const findAllByProviderInADay = jest.spyOn(
      fakeAppointmentsRepository,
      'findAllByProviderInADay',
    );

    const firstAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 17, 13, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    const secondAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 17, 14, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    jest.spyOn(fakeCacheProvider, 'recover').mockImplementation(
      (): Promise<Appointment[]> => {
        return Promise.resolve([firstAppointment, secondAppointment]);
      },
    );

    const providersAppointments = await listProviderAppointmentsService.execute(
      {
        day: 17,
        month: 11,
        year: 2020,
        provider_id: '01',
      },
    );

    expect(findAllByProviderInADay).not.toBeCalled();
    expect(providersAppointments.length).toBe(2);
  });
});
