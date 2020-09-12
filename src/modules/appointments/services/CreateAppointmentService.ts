import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepositories';

/**
 * Service: responsável por tratar as regras de negócio
 * - o nome do arquivo descreve o que ele vai fazer
 * - cada service é responsável por uma única funciolalidade
 */

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  /**
   * terá um único método que é responsável por executa-lo
   *  - "execute Create appoitnment"
   */
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
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
      throw new AppError('This date is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
