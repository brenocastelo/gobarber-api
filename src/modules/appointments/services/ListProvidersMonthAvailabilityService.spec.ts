import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ListProvidersMonthAvailabilityService from './ListProvidersMonthAvailabilityService';

let fakeAppointmentRepository: IAppointmentRepository;
let listProvidersMonthAvailabilityService: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailabilityService = new ListProvidersMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should list provider availability by month', async () => {
    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 8, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 9, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 10, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 11, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 12, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 13, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 14, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 15, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 16, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 10, 17, 17, 0, 0),
      provider_id: '01',
      user_id: '121212',
    });

    const available = await listProvidersMonthAvailabilityService.execute({
      provider_id: '01',
      month: 11,
      year: 2020,
    });

    /*
     * expect.arrayContaining: verificar se o array esperado contém um subconjunto especifico
     * usamos quando só queremos compara uma parte e não todo o array
     * já que não vamos testar se todos os dias do mês estão de acordo
     */
    expect(available).toEqual(
      expect.arrayContaining([
        { day: 12, available: true },
        { day: 17, available: false },
        { day: 20, available: true },
      ]),
    );
  });
});
