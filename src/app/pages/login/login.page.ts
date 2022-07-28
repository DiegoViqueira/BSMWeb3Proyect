import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: any;
  ethersForm: any;

  wallet:any = {
    address: ""
  };


  constructor(private activatedRoute: ActivatedRoute,public alertController: AlertController , private formBuilder: FormBuilder, private authService:AuthServiceService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      seeds: "",
      password: ""
    });
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

    if (!loginData.seeds) {
      const alert = await this.alertController.create({
        message: "Introduce tus semillas",
        buttons: ['OK']
      });
  
      await alert.present();

      return;
    }

    if ( await this.authService.login(loginData.seeds,loginData.password))
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

}
