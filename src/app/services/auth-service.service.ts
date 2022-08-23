import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

import {AlertController} from '@ionic/angular';
import {WalletService} from './wallet.service';
import {Wallet} from '../interfaces/wallet';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  role:BehaviorSubject<string> = new BehaviorSubject<string>(null);;
  wallet: BehaviorSubject<Wallet> = new BehaviorSubject<Wallet>(null);
  window: any;

  constructor(@Inject(DOCUMENT) private document: Document, public alertController: AlertController,
              private walletService: WalletService, private toastService: ToastService) {
    this.window = this.document.defaultView;
  }

  getWalletAddress(): Observable<Wallet> {
    return this.wallet;
  }

  async login(seeds): Promise<boolean> {

    const tempWallet = await this.walletService.initWallet(seeds);
    this.wallet.next(tempWallet as Wallet);
    this.isAuthenticated.next(true);
    return true;
  }

  setRole(role:string)
  {
    this.role.next(role);
  }
  
  getRole(): Observable<string>
  {
    return this.role;
  }
  
  loginWithMetamask(): boolean {
    return this.window.ethereum.enable().then(async (accounts: any) => {
      let address = accounts[0]
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
