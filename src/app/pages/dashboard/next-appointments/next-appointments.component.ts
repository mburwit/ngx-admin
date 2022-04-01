import {Component, OnDestroy} from '@angular/core';
import {filter, takeWhile} from 'rxjs/operators';
import {NbMenuService} from '@nebular/theme';
import {Appointment} from '../../../@core/data/appointments';
import {AppointmentService} from '../../../@core/mock/appointments.service';

@Component({
  selector: 'ngx-next-appointments',
  templateUrl: './next-appointments.component.html',
  styleUrls: ['./next-appointments.component.scss'],
})
export class NextAppointmentsComponent implements OnDestroy {

  private alive = true;

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentService, private menuService: NbMenuService) {
    this.appointmentService.getAppointments().pipe(takeWhile(() => this.alive))
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
      });
    this.menuService.onItemClick()
      .pipe(filter(({tag}) => tag && tag.startsWith('appointment-menu-'))).subscribe((event) => {
      this.onAction(event.item.data);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onAction(event: { action: string, id: string }) {
    // if ('done' === event.action) {
    //   this.taskService.markDone(event.id);
    // }
  }

}
