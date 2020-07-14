import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepositories from '../repositories/AppointmentsRepositories';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepositories();
/**
 * Rotas:
 * - receber requisições
 * - mandar dados das rquisições para o service ou repository
 * - retornar resposta
 */

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    // tranformação de dadod
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.json({ error: error.message });
  }
});

export default appointmentRouter;
