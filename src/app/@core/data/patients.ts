import {User} from './users';
import {Observable} from 'rxjs';
import {v4 as uuid} from 'uuid';

export interface PathwayItem {
  readonly id: string;
  readonly title: string;
  status: string;
  timestamp?: Date;
  note?: string;
}

export class Pathway {
  lastChanged: Date = new Date();
  anmeldung: PathwayItem = {id: uuid(), title: 'Anmeldung', status: 'grey'};
  material: PathwayItem = {id: uuid(), title: 'Material', status: 'grey'};
  tzgCheck: PathwayItem = {id: uuid(), title: 'TZG Check', status: 'grey'};
  sequencing: PathwayItem = {id: uuid(), title: 'Sequencing', status: 'grey'};
  mtb: PathwayItem = {id: uuid(), title: 'MTB', status: 'grey'};
  followUps: PathwayItem[] = [];

  constructor(config ?: any) {
    if (config) {
      this.lastChanged = config.lastChanged || this.lastChanged;
      this.anmeldung = {...this.anmeldung, ...config.anmeldung};
      this.material = {...this.material, ...config.material};
      this.tzgCheck = {...this.tzgCheck, ...config.tzgCheck};
      this.sequencing = {...this.sequencing, ...config.sequencing};
      this.mtb = {...this.mtb, ...config.mtb};
      this.followUps = config.followUps || [];
      while (this.followUps.length < 5) {
        this.followUps.push({id: uuid(), title: 'Follow-up', status: 'grey'});
      }
    }
  }
}

export interface Patient extends User {
  pathway: Pathway;
  birthday: Date;
  diagnosis: string;
}

export abstract class PatientData {
  abstract getPatients(): Observable<Patient[]>;
}
