import { Injectable } from '@angular/core';
declare var require: any
var CryptoJS = require("crypto-js");
@Injectable()
export class CryptoService {
    
    key:string;
    constructor(){
        this.key = "ssaldkmaosweiuf231owdalsd0"
    }

    asignarKey(key){
        this.key=key;
    }
    encode(data) {
        const strData = JSON.stringify(data);
        return CryptoJS.AES.encrypt(strData, this.key);
    }
    decode(data:string){
        var bytes = CryptoJS.AES.decrypt(data, this.key);
        var str = bytes.toString(CryptoJS.enc.Utf8);
        
        return JSON.parse(str);
    }

    encodeSHA256(data) {
        const strData = JSON.stringify(data);
        return CryptoJS.SHA256(strData, this.key);
    }
}
