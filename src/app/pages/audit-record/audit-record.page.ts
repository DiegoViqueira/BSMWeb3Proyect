import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { readFileContent } from 'src/app/resources/resurces';
import { AuditService } from 'src/app/services/audit.service';
import { CryptograpyService } from 'src/app/services/cryptograpy.service';

@Component({
  selector: 'app-audit-record',
  templateUrl: './audit-record.page.html',
  styleUrls: ['./audit-record.page.scss'],
})
export class AuditRecordPage implements OnInit {

  auditRecordForm:any;
  fileHash:string;
  blochainHash:string;
  establishments:Array<string>;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder ,private auditService: AuditService
    ,private cryproService: CryptograpyService) {
    this.auditRecordForm = this.formBuilder.group({
      establishmentId: ['', Validators.required],
      documentId: ['', Validators.required],
      file: ['', Validators.required],

    });

  }

  async fileChanged(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileContent = await readFileContent(file);
      this.fileHash = "0x" + this.cryproService.encodeKECCAK256(fileContent.toString()).toString("hex");
    }
  }
 
  async audit(auditRecordForm)
  {
    this.blochainHash = await this.auditService.auditDocument(auditRecordForm.establishmentId,auditRecordForm.documentId);

  }

  async ngOnInit() {

    this.establishments = await this.auditService.ListEstablishments();
  }

}
