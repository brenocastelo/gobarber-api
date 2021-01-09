import { getRepository, Raw, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import FindAllByProviderInAMonthDTO from '@modules/appointments/dtos/FindAllByProviderInAMonthDTO';
import FindAllByProviderInADayDTO from '@modules/appointments/dtos/FindAllByProviderInADayDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  public constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const hasAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return hasAppointment;
  }

  public async findAllByProviderInAMonth({
    provider_id,
    month,
    year,
  }: FindAllByProviderInAMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName => `
          to_char(${dateFieldName}, 'MM-YYYYY') = '${parsedMonth}-${year}'
        `,
        ),
      },
    });

    return appointments;
  }

  public async findAllByProviderInADay({
    provider_id,
    year,
    month,
    day,
  }: FindAllByProviderInADayDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName => `
        to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }
}

export default AppointmentsRepository;

/**
 * findByDate(date).then(response => response)
 * const response = await findByDate(date)
 *
 * em ambos os casos acima a variável response será do tiopo Appointment ou null
 * */
