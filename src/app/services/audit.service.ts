import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import * as util from "ethereumjs-util";
import { Wallet } from '../interfaces/wallet';
import { WalletService } from './wallet.service';
const AuditABI = require ('../../../build/contracts/AuditManagement.json');
import { Transaction } from "ethereumjs-tx";
import { AuthServiceService } from './auth-service.service';
import { env } from 'process';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast.service';
import { AuditResponse } from '../interfaces/AuditResponse';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  contract: any;
  web3:Web3;
  wallet:Wallet;
  constructor( private authService:AuthServiceService , private toastService: ToastService , private  walletService:WalletService) {

    this.authService.getWalletAddress().subscribe(wallet =>  {
      this.wallet = wallet;

    });
  }


  async initWeb3() {
    this.web3 = new Web3;

    this.web3.setProvider(
        new Web3.providers.HttpProvider(environment.provider)
    );
  }


  async getEstablishmentID(wallet:Wallet)
  {

      await this.initWeb3();
      this.contract = await new this.web3.eth.Contract(AuditABI.abi, environment.contractAddress);
      return await this.contract.methods.getStablishmentID(wallet.address).call().catch(error => {
        this.toastService.presentToast(error,'danger');
      });;

   }

   async addEstablishment( establishmentID:string , address:string ):Promise<AuditResponse>
   {
    if ( ! util.isValidAddress(address)) {
      this.toastService.presentToast("Address invalida. ",'danger');
      return  {result:false, data:null} as AuditResponse;
    }

       if( this.wallet.balance === "0" )
       {
           this.toastService.presentToast("No tiene Suficiente Balance",'danger');
           return  {result:false, data:null} as AuditResponse;
       }

       await this.initWeb3();
       this.contract = await new this.web3.eth.Contract(AuditABI.abi, environment.contractAddress);

       var rawData = {
        from: this.wallet.address,
        to: environment.contractAddress ,
        value: 0,
        gasPrice: this.web3.utils.toHex(10000000000),
        gasLimit: this.web3.utils.toHex(1000000),
        nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
        data: this.contract.methods.AddEstablishment(establishmentID,address).encodeABI()
      };


       return  this.web3.eth.sendSignedTransaction(this.walletService.signTransaction(new Transaction(rawData),this.wallet)).then((receipt:any) => {
          this.toastService.presentToast("Establablasimiento agregado satisfactoriamente.",'success');
          return  {result:true, data:receipt} as AuditResponse;
        }, (err:any) => {
           const ErrorArray = err.message.split("revert ");
           this.toastService.presentToast(ErrorArray[1],'danger');
           return  {result:false, data:null} as AuditResponse;

        });


    }


    async registerDocument( establishmentID:string, docuemtnID:string , docuemtnHash:Buffer ):Promise<AuditResponse>
    {
        if( this.wallet.balance === "0" )
        {
            this.toastService.presentToast("No tiene Suficiente Balance",'danger');
            return  {result:false, data:null} as AuditResponse;
        }

        await this.initWeb3();
        this.contract = await new this.web3.eth.Contract(AuditABI.abi, environment.contractAddress);

        var rawData = {
         from: this.wallet.address,
         to: environment.contractAddress ,
         value: 0,
         gasPrice: this.web3.utils.toHex(10000000000),
         gasLimit: this.web3.utils.toHex(1000000),
         nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
         data: this.contract.methods.registerAudit(establishmentID,docuemtnID,docuemtnHash).encodeABI()
       };


        return  this.web3.eth.sendSignedTransaction(this.walletService.signTransaction(new Transaction(rawData),this.wallet)).then((receipt:any) => {
           this.toastService.presentToast("Documento agregado satisfactoriamente.",'success');
           return  {result:true, data:receipt} as AuditResponse;
         }, (err:any) => {
            const ErrorArray = err.message.split("revert ");
            this.toastService.presentToast(ErrorArray[1],'danger');
            return  {result:false, data:null} as AuditResponse;

         });


     }


}