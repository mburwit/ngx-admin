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

  /**
   * Returns the current step in the pathway.
   * @param p the patient whose pathway is searched
   * @param completed if true, it returns the latest completed (green) pathway step,
   * otherwise it returns the latest pathway step that s not completed yet (default).
   */
  static currentPathwayStep(p: Patient, completed?: boolean): PathwayItem|undefined {
    completed = completed === undefined ? false : completed;
    const completeStatus = 'green';
    let latestCompletedStep = undefined;
    let currentStep = undefined;

    if (p.pathway.anmeldung.status !== completeStatus) {
      currentStep = p.pathway.anmeldung;
    } else if (p.pathway.material.status !== completeStatus) {
      latestCompletedStep = p.pathway.anmeldung;
      currentStep = p.pathway.material;
    } else if (p.pathway.tzgCheck.status !== completeStatus) {
      latestCompletedStep = p.pathway.material;
      currentStep = p.pathway.tzgCheck;
    } else if (p.pathway.sequencing.status !== completeStatus) {
      latestCompletedStep = p.pathway.tzgCheck;
      currentStep = p.pathway.sequencing;
    } else if (p.pathway.mtb.status !== completeStatus) {
      latestCompletedStep = p.pathway.sequencing;
      currentStep = p.pathway.mtb;
    } else {
      for (let i = 0; i < p.pathway.followUps.length; i++) {
        if (p.pathway.followUps[i].status !== completeStatus) {
          latestCompletedStep = i === 0 ? p.pathway.mtb : p.pathway.followUps[i - 1];
          currentStep = p.pathway.followUps[i];
          break;
        }
      }
    }
    if (!currentStep) {
      latestCompletedStep = p.pathway.followUps[p.pathway.followUps.length - 1];
    }
    return completed ? latestCompletedStep : currentStep;
  }

  getIcon(pathwayItem: PathwayItem) {
    switch (pathwayItem.status) {
      case 'green':
        return 'checkmark-circle-2';
      case 'yellow':
        return 'play-circle';
      case 'red':
        return 'alert-triangle';
      default:
        return 'radio-button-off';
    }
  }
}
