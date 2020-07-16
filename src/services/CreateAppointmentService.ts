import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepositories';

/**
 * Service: responsável por tratar as regras de negócio
 * - o nome do arquivo descreve o que ele vai fazer
 * - cada service é responsável por uma única funciolalidade
 */

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  /**
   * terá um único método que é responsável por executa-lo
   *  - "execute Create appoitnment"
   */
  public async execute({ provider, date }: Request): Promise<Appointment> {
    /**
     * regra de negócio:
     *  - cada agendamento só pode ser marcado a cada hora (ex: 16:00, 17: 00)
     */
    const appointmentDate = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const hasAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw Error('This date is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
