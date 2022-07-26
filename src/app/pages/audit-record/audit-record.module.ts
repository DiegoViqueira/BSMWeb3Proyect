import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditRecordPageRoutingModule } from './audit-record-routing.module';

import { AuditRecordPage } from './audit-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditRecordPageRoutingModule
  ],
  declarations: [AuditRecordPage]
})
export class AuditRecordPageModule {}
