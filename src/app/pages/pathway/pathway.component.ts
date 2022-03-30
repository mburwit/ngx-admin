import {Component, OnInit} from '@angular/core';
import {Patient} from '../../@core/data/patients';
import {PatientService} from '../../@core/mock/patients.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.scss'],
})
export class PathwayComponent implements OnInit {

  public patient: Patient;

  constructor(public patientService: PatientService,
              private router: Router) {

  }

  ngOnInit(): void {
    const selectedPatientId = this.patientService.getSelectedPatient();
    if (selectedPatientId === null) {
      this.router.navigate(['/']).then();
    } else {
      this.patientService.getPatient(selectedPatientId).subscribe(
        p => { this.patient = p; },
      );
    }
  }

}
