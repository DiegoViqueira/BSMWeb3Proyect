import { Component, OnInit } from '@angular/core';
import { filter, map ,take} from 'rxjs/operators';
import { Wallet } from './interfaces/wallet';
import { AuditService } from './services/audit.service';
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

  disable_link=true;
  wallet:Wallet;
  establishment:string;
  
  constructor( private authService:AuthServiceService, private auditService:AuditService) {}
  
  ngOnInit() {
    this.authService.getWalletAdress().subscribe( async wallet =>  {
        this.wallet = wallet;
        if(this.wallet !== null)
           this.establishment =  await this.auditService.getEstablishmentID(this.wallet);
      });

    
  }
  
  ngOnDestroy() {
     
  }
}
