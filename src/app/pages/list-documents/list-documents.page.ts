import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { AuditService } from 'src/app/services/audit.service';
import { OverlayEventDetail } from '@ionic/core/components'; 
import { ModalCompareComponent } from '../../components/modal-compare/modal-compare.component'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.page.html',
  styleUrls: ['./list-documents.page.scss'],
})
export class ListDocumentsPage implements OnInit {

  establishmentRecords:any[];
  listDocumentForm:any;
  constructor(private formBuilder: FormBuilder,private auditService: AuditService,private modalCtrl: ModalController) { 
    this.listDocumentForm = this.formBuilder.group({
      establishmentId: ['', Validators.required],
      date: ['', Validators.required],
   
    });
  }


  async ngOnInit() {
   }

  async getDocument(listDocumentForm:any)
  {
       //TODO ADD COMPONEN WITH FILTERS
       console.info(listDocumentForm.establishmentId) 
       let address = await this.auditService.getContractAddressFromEstablishmentID(listDocumentForm.establishmentId);
       console.info(address) 
       console.info(listDocumentForm.date)
       this.establishmentRecords = await  this.auditService.getEvents(address,new Date(listDocumentForm.date));
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
