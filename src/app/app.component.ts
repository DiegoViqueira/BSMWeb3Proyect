import { Component, OnInit } from '@angular/core';
import { filter, map ,take} from 'rxjs/operators';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  public appPages = [
    { title: 'Add Establishment', url: 'add-establishment', icon: 'person-add' },
    { title: 'Audit Record', url: 'audit-record', icon: 'archive' },
    { title: 'Add Document Record', url: 'add-document', icon: 'document-attach' },
    { title: 'Log Out', url: 'log-out', icon: 'exit' },
  ];

  wallet:any;
  
  constructor( private authService:AuthServiceService) {}
  
  ngOnInit(): void {
    this.authService.getWalletAdress().subscribe( adress =>    this.wallet = adress );
  }
  
  ngOnDestroy() {
     this.authService.getWalletAdress();
  }
}
