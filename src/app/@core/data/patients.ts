import {User} from './users';
import {Observable} from 'rxjs';

export interface PathwayItem {
  readonly title: string;
  status: string;
  timestamp?: Date;
  note?: string;
}

export class Pathway {
  lastChanged: Date = new Date();
  anmeldung: PathwayItem = {title: 'Anmeldung', status: 'grey'};
  material: PathwayItem = {title: 'Material', status: 'grey'};
  tzgCheck: PathwayItem = {title: 'TZG Check', status: 'grey'};
  sequencing: PathwayItem = {title: 'Sequencing', status: 'grey'};
  mtb: PathwayItem = {title: 'MTB', status: 'grey'};
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
        this.followUps.push({title: 'Follow-up', status: 'grey'});
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
