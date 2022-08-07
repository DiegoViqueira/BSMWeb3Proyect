import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {readFileContent} from 'src/app/resources/resurces';
import {AuditService} from 'src/app/services/audit.service';
import {CryptograpyService} from 'src/app/services/cryptograpy.service';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {

  addDocuementForm: any;
  minedTransaction: any;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder
    , private auditService: AuditService, private cryproService: CryptograpyService) {

    this.addDocuementForm = this.formBuilder.group({
      documentId: ['', Validators.required],
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    });
  }


  ngOnInit() {
  }


  async registerDocument(addDocuementForm) {

    const fileContent = await readFileContent(addDocuementForm.fileSource);

    //console.info("0x" + this.cryproService.encodeKECCAK256(fileContent.toString()).toString("hex"))
    await this.auditService.registerDocument("Prueba", addDocuementForm.documentId, this.cryproService.encodeKECCAK256(fileContent.toString())).then((result) => {
        if (result.result === true) {
          this.minedTransaction = result.data;
          this.addDocuementForm.reset();
        }
      }
    );

  }

  fileChanged(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.addDocuementForm.patchValue({
        fileSource: file
      });
    }
  }
}
