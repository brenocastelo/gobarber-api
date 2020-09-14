import { Router } from 'express';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
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

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
