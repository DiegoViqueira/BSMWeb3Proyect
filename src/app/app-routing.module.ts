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
    canLoad: [AuthGuardGuard]
  },
  {
    path: 'add-document',
    loadChildren: () => import('./pages/add-document/add-document.module').then( m => m.AddDocumentPageModule),
    canLoad: [AuthGuardGuard]
  },
  {
    path: 'audit-record',
    loadChildren: () => import('./pages/audit-record/audit-record.module').then( m => m.AuditRecordPageModule),
    canLoad: [AuthGuardGuard]
  },
  {
    path: 'log-out',
    loadChildren: () => import('./pages/log-out/log-out.module').then( m => m.LogOutPageModule)
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
