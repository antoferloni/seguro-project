import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MantenimientoListPageRoutingModule } from './mantenimiento-list-routing.module';

import { MantenimientoListPage } from './mantenimiento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MantenimientoListPageRoutingModule
  ],
  declarations: [MantenimientoListPage]
})
export class MantenimientoListPageModule {}
