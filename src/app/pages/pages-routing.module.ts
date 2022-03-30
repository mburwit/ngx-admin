import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'documents',
      data: { preload: false },
      loadChildren: () =>
        import('./documents/documents.module').then(m => m.DocumentsModule),
    },
    {
      path: 'pathway',
      data: { preload: false },
      loadChildren: () =>
        import('./pathway/pathway.module').then(m => m.PathwayModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
