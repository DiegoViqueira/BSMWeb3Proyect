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
       let address = await this.auditService.getContractAddressFromEstablishmentID(listDocumentForm.establishmentId);
       this.establishmentRecords = await  this.auditService.getEvents(address,new Date(listDocumentForm.date));
  }

  async openModal(toCompareHash:string, timestamp:Date , documentId:string ) {
    const modal = await this.modalCtrl.create({
      component: ModalCompareComponent,
      componentProps: { toCompareHash : toCompareHash, 
        timestamp:timestamp,
        documentId:documentId
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     
    }
  }

}
