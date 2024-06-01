import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'mantenimiento-list',
    loadChildren: () => import('./mantenimiento/mantenimiento-list/mantenimiento-list.module').then( m => m.MantenimientoListPageModule)
  },
  {
    path: 'mantenimiento-edit/:id',
    loadChildren: () => import('./mantenimiento/mantenimiento-edit/mantenimiento-edit.module').then( m => m.MantenimientoEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
