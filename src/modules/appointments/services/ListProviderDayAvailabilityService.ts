import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface Request {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

interface Response {
  hour: number;
  isAvailable: boolean;
}

@injectable()
export default class ListProviderDayAvailabilityService {
  public constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Response[]> {
    const appointmentsInADay = await this.appointmentsRepository.findAllByProviderInADay(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const workStartHour = 8;

    const hoursSchedulableInDay = Array.from(
      { length: 10 },
      (_, index) => index + workStartHour,
    );

    const currentTime = new Date(Date.now());

    const hourAvailability = hoursSchedulableInDay.map(hour => {
      const hasAppointmentInHour = appointmentsInADay.find(
        appointment => getHours(appointment.date) === hour,
      );

      const appointmentTime = new Date(year, month - 1, day, hour);

      return {
        hour,
        isAvailable:
          !hasAppointmentInHour && isAfter(appointmentTime, currentTime),
      };
    });

    return hourAvailability;
  }
}
