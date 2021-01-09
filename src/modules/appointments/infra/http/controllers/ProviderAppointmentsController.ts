import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const providerAppointments = await listProviderAppointmentsService.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      provider_id,
    });

    return response.json(classToClass(providerAppointments));
  }
}
