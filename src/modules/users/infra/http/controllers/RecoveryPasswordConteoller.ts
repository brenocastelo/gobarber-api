import RecoveryPasswordService from '@modules/users/services/RecoveryPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RecoveryPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const recoveryPasswordService = container.resolve(RecoveryPasswordService);

    const { email } = request.body;

    await recoveryPasswordService.execute({
      email,
    });

    return response.status(204).send();
  }
}
