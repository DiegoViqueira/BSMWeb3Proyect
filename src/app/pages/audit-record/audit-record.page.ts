import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audit-record',
  templateUrl: './audit-record.page.html',
  styleUrls: ['./audit-record.page.scss'],
})
export class AuditRecordPage implements OnInit {

  auditRecordForm:any;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.auditRecordForm = this.formBuilder.group({
      establishmentId: ['', Validators.required],
      documentId: ['', Validators.required],
      file: ['', Validators.required],

    });

  }
  register(auditRecordForm)
  {}

  ngOnInit() {
  }

}
