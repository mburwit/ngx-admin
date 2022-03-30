import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {patients} from './sample-data';
import {PathwayItem, Patient, PatientData} from '../data/patients';
import {map} from 'rxjs/operators';

@Injectable()
export class PatientService extends PatientData {

  private readonly lsSelectedPatientKey = btoa('selectedPatient');

  private patients$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>(patients);

  getPatients(): Observable<Patient[]> {
    return this.patients$.asObservable();
  }

  getSelectedPatient(): string | null {
    return localStorage.getItem(this.lsSelectedPatientKey) === null ? null :
      atob(localStorage.getItem(this.lsSelectedPatientKey));
  }

  getPatient(id: string): Observable<Patient> {
    return this.getPatients().pipe(
      map(patient => patient.find(p => p.id === id)),
    );
  }

  selectPatient(id: string) {
    localStorage.setItem(this.lsSelectedPatientKey, btoa(id));
  }

  static currentPathwayStep(p: Patient, status?: 'green' | 'yellow' | 'red'): PathwayItem {
    if (!status) {
      status = 'yellow';
    }
    for (let i = 4; i >= 0; i--) {
      if (p.pathway.followUps[i].status === status) {
        return p.pathway.followUps[i];
      }
    }

    if (p.pathway.mtb.status === status) {
      return p.pathway.mtb;
    }
    if (p.pathway.sequencing.status === status) {
      return p.pathway.sequencing;
    }
    if (p.pathway.tzgCheck.status === status) {
      return p.pathway.tzgCheck;
    }
    if (p.pathway.material.status === status) {
      return p.pathway.material;
    }
    return p.pathway.anmeldung;
  }
}
