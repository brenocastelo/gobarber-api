import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute(userId);

    return response.json(providers);
  }
}
