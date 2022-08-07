import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDocumentsPage } from './list-documents.page';

const routes: Routes = [
  {
    path: '',
    component: ListDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDocumentsPageRoutingModule {}
