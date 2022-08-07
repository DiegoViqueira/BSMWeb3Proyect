import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { AuditService } from 'src/app/services/audit.service';
import { OverlayEventDetail } from '@ionic/core/components'; 
import { ModalCompareComponent } from '../../components/modal-compare/modal-compare.component'

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.page.html',
  styleUrls: ['./list-documents.page.scss'],
})
export class ListDocumentsPage implements OnInit {

  establishmentRecords:any[];
  constructor(private auditService: AuditService,private modalCtrl: ModalController) { }


  async ngOnInit() {
    //TODO ADD COMPONEN WITH FILTERS
    this.establishmentRecords = await  this.auditService.getEvents("0x7234cDdbbC86FDA5F972C3157C18D92F34886dFf",new Date());
  }

  async openModal(toCompareHash:string) {
    const modal = await this.modalCtrl.create({
      component: ModalCompareComponent,
      componentProps: { toCompareHash : toCompareHash }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     
    }
  }

}
