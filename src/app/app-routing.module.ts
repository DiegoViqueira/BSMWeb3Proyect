import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuditRecordComponent } from './pages/audit/audit-record/audit-record.component';
import { AddDocumentComponent } from './pages/establishment/add-document/add-document.component';
import { AddEstablishmentComponent } from './pages/establishment/add-establishment/add-establishment.component';

const routes: Routes = [
  {path : 'auth/login', component : LoginComponent},
  {path : 'establishment/AddEstablishment', component : AddEstablishmentComponent},
  {path : 'establishment/AddDocument', component : AddDocumentComponent},
  {path : 'audit/AuditRecord', component : AuditRecordComponent},
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
