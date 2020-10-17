import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.body;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const providerAppointments = await listProviderAppointmentsService.execute({
      year,
      month,
      day,
      provider_id,
    });

    return response.json(providerAppointments);
  }
}
