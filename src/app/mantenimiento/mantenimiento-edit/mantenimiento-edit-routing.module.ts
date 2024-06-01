import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MantenimientoEditPage } from './mantenimiento-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoEditPageRoutingModule {}
