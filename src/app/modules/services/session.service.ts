import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root'
  })
export class SessionService {

    key = "V2xoU2JHTnBRbnBpTWxvd1pESkdlVnBUUW10YVYzaHNaRzFXZG1OSE1XeGlibEU9";  //btoa 3 rounds
    constructor(private cripto: CryptoService) {
    }

    private getMain(){
        const info = sessionStorage.getItem(this.key);
        if (info) {
            return this.cripto.decode(info)    
        }
        return {};
    }

    keyAssign(key){
        this.key=key;
    }


    getData(key) {
        var sesion = this.getMain();
        return sesion[key] || '';
    }


    setData(key:any, value:any) {
        var actual = this.getMain() || {};
        actual[key]=value;
        const dataF = this.cripto.encode(actual);
        sessionStorage.setItem(this.key, dataF);
    }

    getSessionVars(){
        const info = this.getMain();
        return info || {};
    }
}

