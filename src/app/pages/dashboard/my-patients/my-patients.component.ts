import {Component, OnDestroy} from '@angular/core';
import {filter, takeWhile} from 'rxjs/operators';
import {PatientService} from '../../../@core/mock/patients.service';
import {PathwayItem, Patient} from '../../../@core/data/patients';
import {NbMenuService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
})
export class MyPatientsComponent implements OnDestroy {

  private alive = true;

  patients: Patient[];

  constructor(private patientService: PatientService,
              private menuService: NbMenuService,
              private router: Router) {
    this.patientService.getPatients().pipe(takeWhile(() => this.alive))
      .subscribe((patients: Patient[]) => {
        this.patients = patients;
      });
    this.menuService.onItemClick()
        .pipe(filter(({tag}) => tag && tag.startsWith('patient-menu-'))).subscribe((event) => {
      this.onAction(event.item.data);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  latestFollowUp(p: Patient): Date {
    const current: PathwayItem = PatientService.currentPathwayStep(p, true);
    if (current && current.title === 'Follow-up') {
      return current.timestamp;
    } else {
      return undefined;
    }
  }

  getIcon(pathwayItem: PathwayItem) {
    return this.patientService.getIcon(pathwayItem);
  }

  onAction(event: { action: string, id: string }) {
    this.patientService.selectPatient(event.id);
    if ('pathway' === event.action) {
      this.router.navigate(['/pages', 'pathway']).then();
    } else if ('documents' === event.action) {
      this.router.navigate(['/pages', 'documents']).then();
    }
  }
}