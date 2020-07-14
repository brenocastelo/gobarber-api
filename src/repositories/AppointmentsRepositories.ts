import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  // definir varíavel para armazenar os appointments
  private appointments: Appointment[];

  constructor() {
    // inicializar variável de appointments
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const hasAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return hasAppointment || null;
  }

  // operação de criação de appointment
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
