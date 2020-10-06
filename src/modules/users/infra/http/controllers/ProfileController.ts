import GetProfileService from '@modules/users/services/GetProfileService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const getProfileService = container.resolve(GetProfileService);

    const profile = await getProfileService.execute(userId);

    delete profile.password;

    return response.json(profile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, currentPassword, newPassword } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const profile = await updateUserService.execute({
      email,
      name,
      user_id,
      currentPassword,
      newPassword,
    });

    delete profile.password;

    return response.json(profile);
  }
}
