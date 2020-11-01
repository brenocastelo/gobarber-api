import CacheProviderInterface from '@shared/providers/CacheProvider/interfaces/CacheProviderInterface';
import { log } from 'handlebars';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface Request {
  year: number;
  month: number;
  day: number;
  provider_id: string;
}

@injectable()
export default class ListProviderAppointmentsService {
  public constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  public async execute({
    year,
    month,
    day,
    provider_id,
  }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      console.log('Query in DB...');

      appointments = await this.appointmentsRepository.findAllByProviderInADay({
        year,
        month,
        day,
        provider_id,
      });

      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}
