import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

interface Response {
  day: number;
  available: boolean;
}

@injectable()
export default class ListProvidersMonthAvailabilityService {
  public constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: Request): Promise<Response[]> {
    const appointments = await this.appointmentsRepository.findAllByProviderInAMonth(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const arrayOfDays = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    // separar em um método
    const daysAvailability = arrayOfDays.map(day => {
      const fullDateByDay = new Date(year, month - 1, day, 23, 59, 59);
      // separar em um método
      const appointmentsInADay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return {
        day,
        available:
          isAfter(fullDateByDay, new Date()) && appointmentsInADay.length < 10,
      };
    });

    return daysAvailability;
  }
}
