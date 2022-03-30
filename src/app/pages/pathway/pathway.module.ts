import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {PathwayComponent} from './pathway.component';
import {NbCardModule, NbUserModule} from '@nebular/theme';
import {CommonModule} from "@angular/common";

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
  ],
  declarations: [
    PathwayComponent,
  ],
})
export class PathwayModule { }
