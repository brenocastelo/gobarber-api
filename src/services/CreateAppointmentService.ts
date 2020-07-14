import { startOfHour } from 'date-fns';

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
  private appointmentsRepository: AppointmentsRepository;

  /**
   *  Inversion Dependency para garantir que o service sempre receba
   *  a mesma intância de appointment repository que os outro services também usarm esse repositório
   */
  public constructor(appointmentRespository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRespository;
  }
  /**
   * terá um único método que é responsável por executa-lo
   *  - "execute Create appoitnment"
   */
  public execute({ provider, date }: Request): Appointment {
    /**
     * regra de negócio:
     *  - cada agendamento só pode ser marcado a cada hora (ex: 16:00, 17: 00)
     */
    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw Error('This date is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
