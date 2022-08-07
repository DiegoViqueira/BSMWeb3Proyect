import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {readFileContent} from 'src/app/resources/resurces';
import {CryptograpyService} from 'src/app/services/cryptograpy.service';

@Component({
  selector: 'app-modal-compare',
  templateUrl: './modal-compare.component.html',
  styleUrls: ['./modal-compare.component.scss'],
})
export class ModalCompareComponent implements OnInit {

  toCompareHash: string;
  fileHash: String;

  constructor(private modalCtrl: ModalController, private cryproService: CryptograpyService) {
  }

  async fileChanged(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileContent = await readFileContent(file);
      this.fileHash = "0x" + this.cryproService.encodeKECCAK256(fileContent.toString()).toString("hex");
    }
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.toCompareHash, 'confirm');
  }

  ngOnInit() {
  }

}
