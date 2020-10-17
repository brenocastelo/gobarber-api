import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: IAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppoinmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should list provider availability by day', async () => {
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

    // o mock deve ser feito antes da função que executará a função mockada
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 17, 11, 0).getTime();
    });

    const dayAvailability = await listProviderDayAvailability.execute({
      provider_id: '01',
      month: 11,
      year: 2020,
      day: 17,
    });

    expect(dayAvailability).toEqual(
      expect.arrayContaining([
        { hour: 10, isAvailable: false },
        { hour: 11, isAvailable: false },
        { hour: 12, isAvailable: true },
        { hour: 13, isAvailable: false },
        { hour: 14, isAvailable: false },
        { hour: 15, isAvailable: true },
      ]),
    );
  });
});
