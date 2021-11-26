import {Observable} from 'rxjs';
import {User} from './users';

export interface Appointment {
  id: string;
  time: Date;
  title: string;
  attendees: User[];
}

export abstract class AppointmentData {
  abstract getAppointments(): Observable<Appointment[]>;
}
