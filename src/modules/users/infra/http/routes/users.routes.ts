import { Router } from 'express';
import multer from 'multer';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  confirmAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;