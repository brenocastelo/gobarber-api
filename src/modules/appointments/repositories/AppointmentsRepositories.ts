import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const hasAppointment = await this.findOne({
      where: { date },
    });

    return hasAppointment || null;
  }
}

export default AppointmentsRepository;

/**
 * findByDate(date).then(response => response)
 * const response = await findByDate(date)
 *
 * em ambos os casos acima a variável response será do tiopo Appointment ou null
 * */
