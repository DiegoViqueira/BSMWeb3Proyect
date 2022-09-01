import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Wallet } from 'src/app/interfaces/wallet';
import { readFileContent } from 'src/app/resources/resurces';
import { AuditService } from 'src/app/services/audit.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CryptograpyService } from 'src/app/services/cryptograpy.service';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {

  addDocuementForm: any;
  minedTransaction: any;
  establishmentId: string;
  wallet: Wallet;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder
    , private auditService: AuditService, private cryproService: CryptograpyService, private authService: AuthServiceService) {

    this.addDocuementForm = this.formBuilder.group({
      documentId: ['', Validators.required],
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    });
  }


  ngOnInit() {

    this.authService.getWalletAddress().subscribe(async wallet => {
      this.wallet = wallet;
      if (this.wallet !== null)
        this.establishmentId = await this.auditService.getEstablishmentID(this.wallet);
    });
  }


  async registerDocument(addDocuementForm) {

    const fileContent = await readFileContent(addDocuementForm.fileSource);
    await this.auditService.registerDocument(this.establishmentId, addDocuementForm.documentId, this.cryproService.encodeKECCAK256(fileContent.toString())).then((result) => {
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
