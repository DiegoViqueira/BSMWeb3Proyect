export interface  Wallet
{
    address:string;
    balance:string;
    publicKey: Buffer,
    privateKey: Buffer,
}