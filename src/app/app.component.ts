import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from './modules/services/session.service';
import { MessageService } from './modules/services/message.service';
import { CryptoService } from './modules/services/crypto.service';
import { HttpService } from './modules/services/http.service';
import { TableConfiguration } from './modules/interfaces/data-table/table-configuration';
import { TableColumns } from './modules/interfaces/data-table/table-columns';
import { CombosConfiguration } from './modules/interfaces/combos/combos-configuration';

declare var require: any
const jsreport = require('jsreport-browser-client-dist');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Name
  Last
  Charge
  email
  Cel


  urlRequest
  bodyRequest
  title = 'eter-ui';

  textToCrypt;
  textCrypt;
  textToDecrypt;
  textDecrypt;

  keySet
  keyGet
  valueSet
  valueGet

  dataCombos = []

  recargarTabla = new EventEmitter<any>()

  combosConfig: CombosConfiguration =
    {
      visibleField: 'pais'
    }

  configurationTable: TableConfiguration = {
    edit: true,
    add: true,
    delete: true,
    selectable: true,
    addPer: false,
    editPer: false,
    selectionField: 'cedula'
  }

  columnasCofig: TableColumns[] = [
    {
      ID: 'cedula',
      label: 'cedula',
      type: 'number',
      style: {
        textAlign: 'center'
      },
    },
    {
      ID: 'nombre',
      label: 'nombre',
      type: 'text',
      style: {
        textAlign: 'center'
      }
    },
    {
      ID: 'cargo',
      label: 'Cargo ',
      type: 'text',
      style: {
        textAlign: 'center'
      }
    },
<<<<<<< HEAD

    {
      ID:'area',
      label:'Area',
      type:'combo',     
      style:{
        width:'30%',
        textAlign:'center' //text-align

=======
    {
      ID: 'area',
      label: 'Area',
      type: 'combo',
      paramsCombo: {
        url: `http://localhost:3000/api/v1/areas?id_compania=1`,
        visibleField: 'nombre',
        selectionField: 'id'
      },
      style: {
        width: '30%',
        textAlign: 'center' //text-align
>>>>>>> 8558fb670c6968f0ae4b235d437bcfd4def11e30
      }


    }

  ]
  body = []

  constructor(
    private session: SessionService,
    private message: MessageService,
    private crypt: CryptoService,
    private http: HttpService,
  ) { }

  ngOnInit() {
<<<<<<< HEAD

    jsreport.serverUrl = 'http://localhost:5488'

    let request = {
      "data": {
          "to": "Gael Mantilla",
          "from": "Natalia Guevara",
          "price": 5400
      },
      "template": {
          "name": "invoice"
      }
  }
=======
>>>>>>> 8558fb670c6968f0ae4b235d437bcfd4def11e30

   

    this.http.getData('http://localhost:3000/api/v1/usuarios?id_compania=1').subscribe(
<<<<<<< HEAD
      res=>{
        if(res['code']===0){
          this.body=res['body']
=======
      res => {
        if (res['code'] === 0) {
          this.body = res['body']
>>>>>>> 8558fb670c6968f0ae4b235d437bcfd4def11e30
        }
      }
    )

    this.http.getData('http://localhost:3000/api/v1/paises').subscribe(
      res => {
        if (res['code'] === 0) {
          this.dataCombos = res['body']
        }
      }
    )


  }

  openMessage(param) {
    switch (param) {
      case 'Success':
        this.message.Success('Correcto!', 'Mensaje personalizado de correcto.', true)
        break;
      case 'Warning':
        this.message.Warning('Advertencia!', 'Mensaje personalizado de adventerncia', true)
        break;
      case 'Error':
        this.message.Error('Error!', 'Mensaje personalizado de Error', true)
        break;
      case 'Info':
        this.message.Info('Informacion!', 'Mensaje personalizado de informacion', true).then(res => {
          console.log(res)
        })
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

  updateCrypt() {
    this.textCrypt = this.crypt.encode(this.textToCrypt)
  }

  updateDecrypt() {
    this.textDecrypt = this.crypt.decode(this.textToDecrypt)
  }

  setSessionVar() {
    if (!!this.keySet && !!this.valueSet) {
      try {
        this.session.setData(this.keySet, this.valueSet)
        this.message.SuccessToast('Variable establecida correctamente en sesion')
        this.keySet = ''
        this.valueSet = ''
      } catch (e) {
        this.message.ErrorToast('Error estableciendo la variable en sesion')
      }
    } else {
      this.message.Error('Error!', 'para establecer la variable en sesion debe llenar los campos key y value')
    }

  }

  getSessionVar() {
    if (!!this.keyGet) {
      try {
        // this.session.
        // if()
        this.keyGet = ''
      } catch (e) {
        this.message.ErrorToast('Error capturando la variable en sesion')
      }

    } else {
      this.message.Error('Error!', 'para capturar una variable de sesion debe llenar el campo key')
    }
  }


  filaSeleccionada($event) {
    console.log('filaSeleccionada', $event)
  }

  agregar($event) {
    console.log('agregar', $event)
  }

  editar($event) {
    console.log('editar', $event)
  }
  eliminar($event) {
    console.log('eliminar', $event)
    this.recargarTabla.emit()
  }
  seleccionados($event) {
    console.log('seleccionados', $event)
  }
  comboValueID($event) {
    console.log($event)
  }


  sendHttpRequest() {
    let body = JSON.parse(this.bodyRequest)
    console.log(body)
    // return;
    this.http.postData(this.urlRequest, body).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  report(){

    jsreport.serverUrl = 'http://localhost:5488'

    let request = {
      "data": {
        "name":this.Name,
        "lastName":this.Last,
        "charge":this.Charge,
        "email":this.email,
        "cel":this.Cel
      },
      "template": {
        "name": "/saludo/saludo"
      }
    }

    jsreport.render('_blank', request);

    this.Name = ''
    this.Last = ''
    this.Charge = ''
    this.email = ''
    this.Cel = ''

  }

}
