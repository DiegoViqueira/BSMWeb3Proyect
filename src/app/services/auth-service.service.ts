import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import * as Mnemonic from "bitcore-mnemonic";
import * as util from "ethereumjs-util";
import * as CryptoJS from "crypto-js";
import { AlertController } from '@ionic/angular';
import { WalletService } from './wallet.service';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  wallet: BehaviorSubject<Wallet> = new BehaviorSubject<Wallet>(null);
 
  encrypted:string|null = '';
  window: any;
 
  constructor(@Inject(DOCUMENT) private document: Document , public alertController: AlertController , private walletService :WalletService ) {
    this.window = this.document.defaultView;
  }

  getWalletAdress():Observable<Wallet>
  {
     return this.wallet;
  }

 async login( seeds, password): Promise<boolean> {

    if (!Mnemonic.isValid(seeds)) {
      const alert = await this.alertController.create({
        message: "Las semillas no son validas",
        buttons: ['OK']
      });
  
      await alert.present();

      return false;
    }

    this.encrypted = CryptoJS.AES.encrypt(
      seeds,
      password
    ).toString();

    if (this.encrypted) {
      window.localStorage.setItem("seeds", this.encrypted.toString());
    } else {
      window.localStorage.removeItem("seeds");
    }
   
    const tempWallet = await this.walletService.initWallet(seeds);
    this.wallet.next(tempWallet as Wallet);
    this.isAuthenticated.next(true);
    return true;
  }

  loginWithMetamask():boolean {
    return this.window.ethereum.enable().then(async (accounts:any) => {
      var address = accounts[0]
      const tempWallet = await this.walletService.initWalletMetamask(address);
      this.wallet.next(tempWallet as Wallet);
      this.isAuthenticated.next(true);
      return true;
    });
    
  }
 
  logout(): Promise<void> {
    
    this.wallet.next(null);
    this.isAuthenticated.next(false);
    return;
  }
}
