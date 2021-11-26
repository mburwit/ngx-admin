import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {PatientService} from '../../../@core/mock/patients.service';
import {PathwayItem, Patient} from '../../../@core/data/patients';

@Component({
  selector: 'ngx-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
})
export class MyPatientsComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  private alive = true;

  patients: Patient[];

  constructor(private patientService: PatientService) {
    this.patientService.getPatients().pipe(takeWhile(() => this.alive))
      .subscribe((patients: Patient[]) => {
        this.patients = patients;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  latestFollowUp(p: Patient): Date {
    const current: PathwayItem = PatientService.currentPathwayStep(p, 'green');
    if (current.title === 'Follow-up') {
      return current.timestamp;
    } else {
      return undefined;
    }
  }

  getIcon(pathwayItem: PathwayItem) {
    switch (pathwayItem.status) {
      case 'green': return 'checkmark-circle-2';
      case 'yellow': return 'play-circle';
      case 'red': return 'alert-triangle';
      default: return 'radio-button-off';
    }
  }
}
