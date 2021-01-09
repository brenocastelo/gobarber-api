import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import FindAllByProviderInAMonthDTO from '@modules/appointments/dtos/FindAllByProviderInAMonthDTO';
import FindAllByProviderInADayDTO from '@modules/appointments/dtos/FindAllByProviderInADayDTO';
import IAppointmentRepository from '../IAppointmentRepository';

export default class FakeAppointmentsRepository
  implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const existentAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return existentAppointment;
  }

  public async findAllByProviderInAMonth({
    provider_id,
    month,
    year,
  }: FindAllByProviderInAMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllByProviderInADay({
    provider_id,
    year,
    month,
    day,
  }: FindAllByProviderInADayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }
}
