import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import confirmAuthentication from '../middlewares/confirmAuthentication';

const profilerRouter = Router();

const profileController = new ProfileController();

profilerRouter.use(confirmAuthentication);

profilerRouter.get('/', profileController.show);
profilerRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      current_password: Joi.string(),
      new_password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('new_password')),
    },
  }),
  profileController.update,
);

export default profilerRouter;
