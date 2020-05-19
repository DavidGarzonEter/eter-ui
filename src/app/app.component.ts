import { Component, OnInit } from '@angular/core';
import { SessionService } from './modules/services/session.service';
import { MessageService } from './modules/services/message.service';
import { CryptoService } from './modules/services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eter-ui';

  textToCrypt;
  textCrypt;
  textToDecrypt;
  textDecrypt;

  keySet
  keyGet
  valueSet
  valueGet

  constructor(
    private session: SessionService,
    private message: MessageService,
    private crypt : CryptoService
  ) { }

  ngOnInit() {
  }

  openMessage(param) {
    switch (param) {
      case 'Success':
        this.message.Success('Correcto!', 'Mensaje personalizado de correcto.',true)
        break;
      case 'Warning':
        this.message.Warning('Advertencia!', 'Mensaje personalizado de adventerncia', true)
        break;
      case 'Error':
        this.message.Error('Error!', 'Mensaje personalizado de Error', true)
        break;
      case 'Info':
        this.message.Info('Informacion!', 'Mensaje personalizado de informacion', true)
        break;
      case 'SuccessToast':
        this.message.SuccessToast('Mensaje personalizado de correcto.')
        break;
      case 'WarningToast':
        this.message.WarningToast('Mensaje personalizado de adventerncia')
        break;
      case 'ErrorToast':
        this.message.ErrorToast('Mensaje personalizado de Error')
        break;
      case 'InfoToast':
        this.message.InfoToast('Mensaje personalizado de informacion')
        break;
    }
  }

  updateCrypt(){
    this.textCrypt = this.crypt.encode(this.textToCrypt)
  }

  updateDecrypt(){
    this.textDecrypt = this.crypt.decode(this.textToDecrypt)
  }

  setSessionVar(){
    if(!!this.keySet && !!this.valueSet){
      try{
        this.session.setData(this.keySet, this.valueSet)
        this.message.SuccessToast('Variable establecida correctamente en sesion')
        this.keySet=''
        this.valueSet=''
      }catch(e){
        this.message.ErrorToast('Error estableciendo la variable en sesion')
      }
    }else{
      this.message.Error('Error!','para establecer la variable en sesion debe llenar los campos key y value')
    }
    
  }

  getSessionVar(){
    if(!!this.keyGet){
      try{
        this.message.Success('Variable Capturada', `valor: ${this.session.getData(this.keyGet)}`)
        this.keyGet=''
      }catch(e){
        this.message.ErrorToast('Error capturando la variable en sesion')
      }
      
    }else{
      this.message.Error('Error!','para capturar una variable de sesion debe llenar el campo key')
    }
  }
}
