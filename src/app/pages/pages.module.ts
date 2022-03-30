import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import {PathwayModule} from './pathway/pathway.module';
import {DocumentsModule} from './documents/documents.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    PathwayModule,
    DocumentsModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
