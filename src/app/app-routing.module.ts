import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-establishment',
    loadChildren: () => import('./pages/add-establishment/add-establishment.module').then( m => m.AddEstablishmentPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-document',
    loadChildren: () => import('./pages/add-document/add-document.module').then( m => m.AddDocumentPageModule),
    canActivate: [AuthGuardGuard]
  
  },
  {
    path: 'audit-record',
    loadChildren: () => import('./pages/audit-record/audit-record.module').then( m => m.AuditRecordPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'log-out',
    loadChildren: () => import('./pages/log-out/log-out.module').then( m => m.LogOutPageModule)
  },
  {
    path: 'list-documents',
    loadChildren: () => import('./pages/list-documents/list-documents.module').then( m => m.ListDocumentsPageModule),
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule {}
