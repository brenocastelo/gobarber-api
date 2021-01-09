import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    // ? como dizer que esse campos sao obrigatórios?
    // * ainda não há a validação desses campos, que podem vir nulos
    const { year, month, day } = request.query;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providerDayAvailability = await listProviderDayAvailabilityService.execute(
      {
        year: Number(year),
        month: Number(month),
        day: Number(day),
        provider_id,
      },
    );

    return response.json(providerDayAvailability);
  }
}
