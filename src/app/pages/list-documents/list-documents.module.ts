import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDocumentsPageRoutingModule } from './list-documents-routing.module';

import { ListDocumentsPage } from './list-documents.page';
import { ModalCompareComponent } from 'src/app/components/modal-compare/modal-compare.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDocumentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListDocumentsPage,ModalCompareComponent]
})
export class ListDocumentsPageModule {}
