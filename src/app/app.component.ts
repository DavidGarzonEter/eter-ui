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
        this.message.Success('Correcto!', 'Mensaje personalizado de correcto.')
        break;
      case 'Warning':
        this.message.Warning('Advertencia!', 'Mensaje personalizado de adventerncia')
        break;
      case 'Error':
        this.message.Error('Error!', 'Mensaje personalizado de Error')
        break;
      case 'Info':
        this.message.Info('Informacion!', 'Mensaje personalizado de informacion')
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

}
