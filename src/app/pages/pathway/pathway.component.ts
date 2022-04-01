import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PathwayItem, Patient} from '../../@core/data/patients';
import {PatientService} from '../../@core/mock/patients.service';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.scss'],
})
export class PathwayComponent implements OnInit, AfterViewInit {

  public patient: Patient;
  public steps: PathwayItem[] = [];
  private currentPathwayStep?: PathwayItem;

  constructor(public patientService: PatientService,
              private router: Router,
              private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    const selectedPatientId = this.patientService.getSelectedPatient();
    if (selectedPatientId === null) {
      this.router.navigate(['/']).then();
    } else {
      this.loadPathwayItems(selectedPatientId);
    }
  }

  ngAfterViewInit(): void {
    // const element = document.getElementById(this.currentPathwayStep.id);
    // element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest"
    // });
  }

  private loadPathwayItems(selectedPatientId: string) {
    this.patientService.getPatient(selectedPatientId).subscribe(
      p => {
        this.patient = p;
        this.currentPathwayStep = PatientService.currentPathwayStep(p);
        this.steps = [].concat(
          p.pathway.anmeldung,
          p.pathway.material,
          p.pathway.tzgCheck,
          p.pathway.sequencing,
          p.pathway.mtb,
          p.pathway.followUps
        );
      },
    );
  }

  getIcon(pathwayItem: PathwayItem) {
    return this.patientService.getIcon(pathwayItem);
  }


  getBadgeStatus(pathwayItem: PathwayItem) {
    switch (pathwayItem.status) {
      case 'green':
        return 'success';
      case 'yellow':
        return 'warning';
      case 'red':
        return 'danger';
      default:
        return 'basic';
    }
  }

  getBadgeText(pathwayItem: PathwayItem) {
    switch (pathwayItem.status) {
      case 'green':
        return this.datePipe.transform(pathwayItem.timestamp, 'shortDate');
      case 'yellow':
      case 'red':
        return pathwayItem.note || '';
      default:
        return '';
    }
  }

  isCurrentPathwayStep(pathwayItem: PathwayItem) {
    return this.currentPathwayStep !== undefined && this.currentPathwayStep.id === pathwayItem.id;
  }
}
