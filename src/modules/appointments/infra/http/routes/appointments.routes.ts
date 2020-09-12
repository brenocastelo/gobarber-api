import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const appointmentRouter = Router();
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

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // tranformação de dadod
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
