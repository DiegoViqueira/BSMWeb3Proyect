import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Add Establishment', url: '/establishment/AddEstablishment', icon: 'person-add' },
    { title: 'Audit Record', url: '/audit/AuditRecord', icon: 'archive' },
    { title: 'Add Document Record', url: '/establishment/AddDocument', icon: 'document-attach' },
    { title: 'Log Out', url: '/folder/exit', icon: 'exit' },
  ];
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
