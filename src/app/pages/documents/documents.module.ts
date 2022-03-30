import { NgModule } from '@angular/core';

import {DocumentsComponent} from './documents.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DocumentsComponent,
      },
    ]),
  ],
  declarations: [
    DocumentsComponent,
  ],
})
export class DocumentsModule { }
