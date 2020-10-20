import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';
import ListProvidersController from '../controllers/ListProvidersController';
import ListProviderMonthAvailabilityController from '../controllers/ListProvidersMonthAvailabilityController';
import ListProviderDayAvailabilityController from '../controllers/ListProviderDayAvailabilityController';

const providerRouter = Router();
const listProvidersController = new ListProvidersController();
const listProviderMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const listProviderDayAvailabilityController = new ListProviderDayAvailabilityController();

providerRouter.use(confirmAuthentication);

providerRouter.get('/', listProvidersController.index);

providerRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  listProviderMonthAvailabilityController.index,
);

providerRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  listProviderDayAvailabilityController.index,
);

export default providerRouter;
