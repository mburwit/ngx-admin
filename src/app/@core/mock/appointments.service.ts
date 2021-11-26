import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {appointments} from './sample-data';
import {Appointment, AppointmentData} from '../data/appointments';

@Injectable()
export class AppointmentService extends AppointmentData {

  private appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>(appointments);

  getAppointments(): Observable<Appointment[]> {
    return this.appointments$.asObservable();
  }
}
