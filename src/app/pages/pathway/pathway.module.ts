import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {PathwayComponent} from './pathway.component';
import {
  NbAccordionModule,
  NbActionsModule,
  NbBadgeModule,
  NbCardModule,
  NbIconModule,
  NbUserModule
} from '@nebular/theme';
import {CommonModule} from "@angular/common";
import {NgxMatTimelineModule} from "ngx-mat-timeline";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PathwayComponent,
      },
    ]),
    NbCardModule,
    NbUserModule,
    CommonModule,
    NgxMatTimelineModule,
    NbAccordionModule,
    NbIconModule,
    NbActionsModule,
    NbBadgeModule,
  ],
  declarations: [
    PathwayComponent,
  ],
})
export class PathwayModule { }
