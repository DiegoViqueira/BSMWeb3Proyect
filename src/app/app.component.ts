import { Component, OnInit } from '@angular/core';
import { filter, map ,take} from 'rxjs/operators';
import { Wallet } from './interfaces/wallet';
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

  wallet:Wallet;
  
  constructor( private authService:AuthServiceService) {}
  
  ngOnInit(): void {
    this.authService.getWalletAdress().subscribe( wallet =>  {
        this.wallet = wallet;
        console.log(this.wallet);
      });
  }
  
  ngOnDestroy() {
     
  }
}
