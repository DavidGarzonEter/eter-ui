import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable()
export class SessionService {

    key = "3dd3e96c634e00fd6699041522def9a3";
    constructor(private cripto: CryptoService) {
    }

    getMain(){
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

    getActualSession(){
        const info = this.getMain();
        return info || {};
    }
}

