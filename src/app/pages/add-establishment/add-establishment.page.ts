import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-add-establishment',
  templateUrl: './add-establishment.page.html',
  styleUrls: ['./add-establishment.page.scss'],
})
export class AddEstablishmentPage implements OnInit {

  addEstablishmentForm: any;

  constructor(private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder , private auditService:AuditService) { 
    this.addEstablishmentForm = this.formBuilder.group({
      establishmentId: ['', Validators.required],
      establishmentWalletAddress:  ['', Validators.required]
    });

   

  }


  registert(addEstablishmentForm)
  {

      this.auditService.addEstablishment(addEstablishmentForm.establishmentId, addEstablishmentForm.establishmentWalletAddress)
    
  }

  ngOnInit() {
  }



}
