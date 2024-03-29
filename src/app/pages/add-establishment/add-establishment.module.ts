import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddEstablishmentPageRoutingModule } from './add-establishment-routing.module';
import { AddEstablishmentPage } from './add-establishment.page';
import {RegisteredBlockComponent} from "../../components/registered-block/registered-block.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEstablishmentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddEstablishmentPage,RegisteredBlockComponent]
})
export class AddEstablishmentPageModule {}
