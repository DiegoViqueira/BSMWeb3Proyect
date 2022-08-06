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

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  contract: any;
  web3:Web3;
  wallet:Wallet;
  constructor( private authService:AuthServiceService) { 

    this.authService.getWalletAdress().subscribe( wallet =>  {
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
      return await this.contract.methods.getStablishmentID(wallet.address).call();
    
   }


   async addEstablishment( establishmentID:string , address:string )
   {

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
  
      var transaction = new Transaction(rawData);
      transaction.sign(this.wallet.privateKey);
      var serialized = "0x" + transaction.serialize().toString("hex");
  

       
        this.web3.eth.sendSignedTransaction(serialized).then((receipt:any) => {
          console.log(receipt)
        }, (err:any) => {
           const ErrorArray = err.message.split("revert ");
           return ErrorArray[1];
           
        });
       
    

     
       
    }


}
