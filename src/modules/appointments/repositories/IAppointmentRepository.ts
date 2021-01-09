import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import FindAllByProviderInAMonthDTO from '../dtos/FindAllByProviderInAMonthDTO';
import FindAllByProviderInADayDTO from '../dtos/FindAllByProviderInADayDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllByProviderInAMonth(
    data: FindAllByProviderInAMonthDTO,
  ): Promise<Appointment[]>;
  findAllByProviderInADay(
    data: FindAllByProviderInADayDTO,
  ): Promise<Appointment[]>;
}
