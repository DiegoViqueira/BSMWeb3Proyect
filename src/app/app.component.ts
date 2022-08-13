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
    { title: 'Agregar Establecimiento', url: 'add-establishment', icon: 'person-add' },
    { title: 'Agregar Documento', url: 'add-document', icon: 'document-attach' },
    { title: 'Auditar Documento', url: 'audit-record', icon: 'archive' },
    { title: 'Listar Registros', url:'list-documents', icon:'list'},
    { title: 'Salir', url: 'log-out', icon: 'exit' }
  ];

  disable_link=true;
  wallet:Wallet;
  establishment:string;

  constructor( private authService:AuthServiceService, private auditService:AuditService) {}

  ngOnInit() {
    this.authService.getWalletAddress().subscribe( async wallet =>  {
        this.wallet = wallet;
        if(this.wallet !== null)
           this.establishment =  await this.auditService.getEstablishmentID(this.wallet);
      });


  }

  ngOnDestroy() {

  }
}
