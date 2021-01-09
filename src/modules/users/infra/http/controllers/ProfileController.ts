import GetProfileService from '@modules/users/services/GetProfileService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const getProfileService = container.resolve(GetProfileService);

    const profile = await getProfileService.execute(userId);

    return response.json(classToClass(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, current_password, new_password } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const profile = await updateUserService.execute({
      email,
      name,
      user_id,
      current_password,
      new_password,
    });

    return response.json(classToClass(profile));
  }
}
