import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
