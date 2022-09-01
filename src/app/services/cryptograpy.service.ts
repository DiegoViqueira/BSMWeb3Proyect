import { Injectable } from '@angular/core';
import * as util from "ethereumjs-util";

@Injectable({
  providedIn: 'root'
})
export class CryptograpyService {

  constructor() {
  }

  encodeKECCAK256(data: string) {
    return util.keccakFromString(data);
  }
  encodeSHA256(data: string) {
    return util.keccakFromString(data);
  }
}
