import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

/**
 * Service: responsável por tratar as regras de negócio
 * - o nome do arquivo descreve o que ele vai fazer
 * - cada service é responsável por uma única funciolalidade
 */

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  public constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

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

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new AppError('This date is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
