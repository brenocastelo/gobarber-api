import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProvidersMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.query;

    const listProvidersMonthAvailabilityService = container.resolve(
      ListProvidersMonthAvailabilityService,
    );

    const providerMonthAvailability = await listProvidersMonthAvailabilityService.execute(
      {
        year: Number(year),
        month: Number(month),
        provider_id,
      },
    );

    return response.json(providerMonthAvailability);
  }
}
