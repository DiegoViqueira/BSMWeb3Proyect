import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-establishment',
  templateUrl: './add-establishment.page.html',
  styleUrls: ['./add-establishment.page.scss'],
})
export class AddEstablishmentPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
