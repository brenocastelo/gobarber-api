import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import confirmAuthentication from '../middlewares/confirmAuthentication';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  confirmAuthentication,
  upload.single('avatar'),
  (request, response) => {
    return response.json({ file: request.file });
  },
);

export default usersRouter;
