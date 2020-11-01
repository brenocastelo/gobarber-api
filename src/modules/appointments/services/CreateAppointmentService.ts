import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

/**
 * Service: responsável por tratar as regras de negócio
 * - o nome do arquivo descreve o que ele vai fazer
 * - cada service é responsável por uma única funciolalidade
 */

interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  public constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationRepository')
    private notificationRepository: NotificationRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  /**
   * terá um único método que é responsável por executa-lo
   *  - "execute Create appoitnment"
   */
  public async execute({
    provider_id,
    user_id,
    date,
  }: Request): Promise<Appointment> {
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

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        "It's not possible create an appointment on past dates",
      );
    }

    if (user_id === provider_id) {
      throw new AppError(
        "It's not possible create an appointment with same id from user and provider",
      );
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "It's not possible create an appointment before 8pm and after 5pm",
      );
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${formattedDate}`,
    });

    /**
     * no body da requisição da listagem não podemos passa um número iniciando
     * com 0, então quando o cache pega ao dia ou mês (sendo estes menor que 10)
     * para savar no redis, salva sem 0, por isso quando formos invalidar
     * precisamos estar buscano por uma key com adata onde o mê e o dia se forem
     * menor, que 10 não tenham 0
     */
    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
