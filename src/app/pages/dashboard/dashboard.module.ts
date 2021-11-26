import { NgModule } from '@angular/core';
import {
  NbAccordionModule, NbActionsModule,
  NbCardModule, NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbTabsetModule, NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NextAppointmentsComponent } from './next-appointments/next-appointments.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { RecentPatientsComponent } from './recent-patients/recent-patients.component';
import { MyPatientsComponent } from './my-patients/my-patients.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbIconModule,
    NbAccordionModule,
    NbActionsModule,
    NbContextMenuModule,
    NbTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    NextAppointmentsComponent,
    MyTasksComponent,
    RecentPatientsComponent,
    MyPatientsComponent,
  ],
})
export class DashboardModule { }
