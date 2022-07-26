import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditRecordPage } from './audit-record.page';

const routes: Routes = [
  {
    path: '',
    component: AuditRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRecordPageRoutingModule {}
