import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

import uploadConfig from '@config/upload';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository();

  const { name, email, password } = request.body;

  const createUserService = new CreateUserService(userRepository);

  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  confirmAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
