import {Inject, Injectable, OnDestroy} from '@angular/core';
import * as Mnemonic from "bitcore-mnemonic";
import * as util from "ethereumjs-util";
import {hdkey} from "ethereumjs-wallet";
import * as bip39 from "bip39";
import Web3 from 'web3';
import {ToastController} from '@ionic/angular';
import {Wallet} from '../interfaces/wallet';
import {DOCUMENT} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Transaction} from 'ethereumjs-tx';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService implements OnDestroy {

  constructor(public toastController: ToastController, @Inject(DOCUMENT) private document: Document,
              private toastService: ToastService) {
    this.window = this.document.defaultView;
  }

  ngOnDestroy(): void {
    this.web3 = null;
  }

  window: any;
  web3: Web3;

  async initWeb3() {
    this.web3 = new Web3;
    this.web3.setProvider(new Web3.providers.HttpProvider(environment.provider));
    ;
  }

  async initWeb3Metamask() {
    this.web3 = new Web3(this.window.ethereum);
    return this.web3;
  }

  async initWalletMetamask(address: string) {
    await this.initWeb3Metamask();
    var balance = await this.web3.eth.getBalance(address).then((result: any) => {
      return this.web3.utils.fromWei(result, 'ether');
    }).catch((reason) => {
      this.toastService.presentToast('Cant Connect to Metamask..', 'danger');
      return null;
    });

    return {
      address: address,
      balance: balance
    } as Wallet;

  }


  async initWallet(seeds: string) {
    var mnemonic = new Mnemonic(seeds);
    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var path = "m/44'/60'/0'/0/0";
    await this.initWeb3();

    var wallet = hdkey
      .fromMasterSeed(seed)
      .derivePath(path)
      .getWallet();

    var privateKey = wallet.getPrivateKey();
    var publicKey = util.privateToPublic(privateKey);
    var address = "0x" + util.pubToAddress(publicKey).toString("hex");
    var balance = await this.web3.eth.getBalance(address).then((result: any) => {
      return this.web3.utils.fromWei(result, 'ether');
    }).catch((reason) => {
      this.toastService.presentToast('Cant Connect to BlockChain..', 'danger');
      ;
      return null;
    });

    return {
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: balance
    } as Wallet;
  }


  signTransaction(transaction: Transaction, wallet: Wallet): string {
    transaction.sign(wallet.privateKey);
    var serialized = "0x" + transaction.serialize().toString("hex");
    return serialized;
  }

}
