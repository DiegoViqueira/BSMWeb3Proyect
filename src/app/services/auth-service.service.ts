import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  walletAdress: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  wallet:any = {
    address: ""
  };
  encrypted:string|null = '';
  web3:any;
  window: any;
 
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  getWalletAdress():Observable<string>
  {
     return this.walletAdress;
  }

  login( seeds, password): Observable<any> {

    console.info("Seeds : " + seeds )
    console.info("Password : " + password )
    
    this.isAuthenticated.next(true);
    return;
  }

  loginWithMetamask():boolean {
    return this.window.ethereum.enable().then(async (accounts:any) => {
      var address = accounts[0]
      this.wallet = {
        address
      }
      this.walletAdress.next(address);
      this.isAuthenticated.next(true);
      return true;
    });
    
  }
 
  logout(): Promise<void> {
    
    this.walletAdress.next('');
    this.isAuthenticated.next(false);
    return;
  }
}
