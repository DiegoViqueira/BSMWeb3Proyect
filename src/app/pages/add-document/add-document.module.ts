import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddDocumentPageRoutingModule } from './add-document-routing.module';
import { AddDocumentPage } from './add-document.page';
import { RegisteredBlockComponent } from 'src/app/components/registered-block/registered-block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDocumentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddDocumentPage,RegisteredBlockComponent]
})
export class AddDocumentPageModule {}
