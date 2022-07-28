import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {

  addDocuementForm:any;
  constructor(private activatedRoute: ActivatedRoute ,  private formBuilder: FormBuilder) {

    this.addDocuementForm = this.formBuilder.group({
      documentId: ['', Validators.required],
      file: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

}
