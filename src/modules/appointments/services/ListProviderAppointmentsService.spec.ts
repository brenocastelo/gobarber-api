import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: IAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
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
});
