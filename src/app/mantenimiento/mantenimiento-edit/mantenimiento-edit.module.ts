import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MantenimientoEditPageRoutingModule } from './mantenimiento-edit-routing.module';

import { MantenimientoEditPage } from './mantenimiento-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MantenimientoEditPageRoutingModule
  ],
  declarations: [MantenimientoEditPage]
})
export class MantenimientoEditPageModule {}
