import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MantenimientoListPage } from './mantenimiento-list.page';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoListPageRoutingModule {}
