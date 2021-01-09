import { Router } from 'express';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import RecoveryPasswordController from '@modules/users/infra/http/controllers/RecoveryPasswordConteoller';
import { celebrate, Joi, Segments } from 'celebrate';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const recoveryPasswordController = new RecoveryPasswordController();

passwordRouter.patch(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      // password confirmation needs to be equal the password
      password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    },
  }),
  resetPasswordController.create,
);
passwordRouter.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  recoveryPasswordController.create,
);

export default passwordRouter;
