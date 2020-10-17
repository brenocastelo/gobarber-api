import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
/**
 * Rotas:
 * - receber requisições
 * - mandar dados das rquisições para o service ou repository
 * - retornar resposta
 */
appointmentRouter.use(confirmAuthentication);

/* appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  
  return response.json(appointments);
}); */

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentRouter.get('/schedule', providerAppointmentsController.index);

export default appointmentRouter;
