import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  public constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const hasAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return hasAppointment;
  }
}

export default AppointmentsRepository;

/**
 * findByDate(date).then(response => response)
 * const response = await findByDate(date)
 *
 * em ambos os casos acima a variável response será do tiopo Appointment ou null
 * */
