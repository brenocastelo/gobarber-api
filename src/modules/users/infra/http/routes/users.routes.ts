import { Router } from 'express';
import multer from 'multer';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

import storageConfig from '@config/storage';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(storageConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  confirmAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
