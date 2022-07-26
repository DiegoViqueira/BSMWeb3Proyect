import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEstablishmentPageRoutingModule } from './add-establishment-routing.module';

import { AddEstablishmentPage } from './add-establishment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEstablishmentPageRoutingModule
  ],
  declarations: [AddEstablishmentPage]
})
export class AddEstablishmentPageModule {}
