import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditRecordPageRoutingModule } from './audit-record-routing.module';

import { AuditRecordPage } from './audit-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditRecordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuditRecordPage]
})
export class AuditRecordPageModule {}
