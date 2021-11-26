import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {Patient} from '../../../@core/data/patients';
import {PatientService} from '../../../@core/mock/patients.service';

@Component({
  selector: 'ngx-recent-patients',
  templateUrl: './recent-patients.component.html',
  styleUrls: ['./recent-patients.component.scss'],
})
export class RecentPatientsComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  private alive = true;

  patients: Patient[];

  constructor(private patientService: PatientService) {
    this.patientService.getPatients().pipe(takeWhile(() => this.alive))
      .subscribe((patients: Patient[]) => {
        this.patients = patients
          .sort((p1, p2) => {
            // Check if the first is greater than second
            if (p1.pathway.lastChanged.getTime() < p2.pathway.lastChanged.getTime()) {
              return 1;
            }
            // Check if the first is less than second
            if (p1.pathway.lastChanged.getTime() > p2.pathway.lastChanged.getTime()) {
              return -1;
            }
            // equally
            return 0;
          })
          .filter((p, index, array) => array.indexOf(p) < 3);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  currentStep(p: Patient) {
    return PatientService.currentPathwayStep(p).title;
  }
}

