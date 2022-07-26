import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audit-record',
  templateUrl: './audit-record.page.html',
  styleUrls: ['./audit-record.page.scss'],
})
export class AuditRecordPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
