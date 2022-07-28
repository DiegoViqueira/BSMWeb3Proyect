import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as CryptoJS from "crypto-js";
import * as Mnemonic from "bitcore-mnemonic";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: any;
  encrypted:string|null = '';
  metamaskIconSvg = "/assets/icon/metamask-icon.svg";
 
  constructor(private activatedRoute: ActivatedRoute,public alertController: AlertController , private formBuilder: FormBuilder, private authService:AuthServiceService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      seeds: "",
      password: ""
    });

    this.encrypted = window.localStorage.getItem("seeds");
   }

  async ngOnInit() {
  }


  async sendLogin(loginData:any) {

    if (!loginData.password) {
      const alert = await this.alertController.create({
        message: "Introduce tu password",
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }

    if (this.encrypted) {
      var decrypt = CryptoJS.AES.decrypt(this.encrypted, loginData.password);

      loginData.seeds = decrypt.toString(CryptoJS.enc.Utf8);
    }

    if (!Mnemonic.isValid(loginData.seeds)) {
      const alert = await this.alertController.create({
        message: "Las semillas no son validas",
        buttons: ['OK']
      });
  
      await alert.present();

      return;
    }

    this.encrypted = CryptoJS.AES.encrypt(
      loginData.seeds,
      loginData.password
    ).toString();

    if (this.encrypted) {
      window.localStorage.setItem("seeds", this.encrypted.toString());
    } else {
      window.localStorage.removeItem("seeds");
    }


    if ( await this.authService.login(loginData.seeds))
    {
      this.router.navigateByUrl('/add-document', { replaceUrl: true });
    }

  }

  loginWithMetamask()
  {
     if ( this.authService.loginWithMetamask() )
     {
      this.router.navigateByUrl('/add-document', { replaceUrl: true });
     }
  }


  removeSeeds() {
    window.localStorage.removeItem("seeds");
    this.encrypted = null;

  }

}
