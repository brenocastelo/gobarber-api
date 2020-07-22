import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepositories';

import confirmAuthentication from '../middlewares/confirmAuthentication';

const appointmentRouter = Router();
/**
 * Rotas:
 * - receber requisições
 * - mandar dados das rquisições para o service ou repository
 * - retornar resposta
 */

appointmentRouter.use(confirmAuthentication);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    // tranformação de dadod
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

export default appointmentRouter;
