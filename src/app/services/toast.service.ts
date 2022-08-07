import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {
  }


  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: type
    });
    toast.present();
  }
}
