import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEstablishmentPage } from './add-establishment.page';

const routes: Routes = [
  {
    path: '',
    component: AddEstablishmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEstablishmentPageRoutingModule {}
