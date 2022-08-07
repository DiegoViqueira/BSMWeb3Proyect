import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.page.html',
  styleUrls: ['./list-documents.page.scss'],
})
export class ListDocumentsPage implements OnInit {

  establishmentRecords:any[];
  constructor(private auditService: AuditService) { }

  async ngOnInit() {

    this.establishmentRecords = await  this.auditService.getEvents("0x7234cDdbbC86FDA5F972C3157C18D92F34886dFf",new Date());
    console.info(this.establishmentRecords)

  }

}
