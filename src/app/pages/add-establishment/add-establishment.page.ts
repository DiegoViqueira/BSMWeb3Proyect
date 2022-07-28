import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-establishment',
  templateUrl: './add-establishment.page.html',
  styleUrls: ['./add-establishment.page.scss'],
})
export class AddEstablishmentPage implements OnInit {

  addEstablishmentForm: any;

  constructor(private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder) { 
    this.addEstablishmentForm = this.formBuilder.group({
      establishmentId: ['', Validators.required],
      establishmentWalletAddress:  ['', Validators.required]
    });

   

  }


  registert(addEstablishmentForm)
  {
    
  }

  ngOnInit() {
  }



}
