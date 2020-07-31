import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from './modules/services/session.service';
import { MessageService } from './modules/services/message.service';
import { CryptoService } from './modules/services/crypto.service';
import { HttpService } from './modules/services/http.service';
import { TableConfiguration } from './modules/interfaces/data-table/table-configuration';
import { TableColumns } from './modules/interfaces/data-table/table-columns';
import { CombosConfiguration } from './modules/interfaces/combos/combos-configuration';
import { FileFormsService } from './modules/services/file-forms.service';
import { fileFormsParams } from './modules/interfaces/file-forms-service/file-forms-params';
import { FunctionsService } from './modules/services/functions.service';

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

  today 


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
    primaryKey: 'cedula'
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

    {
      ID:'area',
      label:'Area',
      type:'combo',     
      paramsCombo:{
        selectionField:'id',
        url:'http://localhost:3000/api/v1/areas?id_compania=1',
        visibleField:'nombre'
      },
      style:{
        width:'30%',
        textAlign:'center', //text-align
      }
    }

  ]
  body = []

  constructor(
    private session: SessionService,
    private message: MessageService,
    private crypt: CryptoService,
    private http: HttpService,
    private fileForms: FileFormsService,
    private functions : FunctionsService
  ) { }

  async ngOnInit() {


    try {
      let res = await this.http.getDataPromise('http://localhost:3000/usuarios')
      console.log(res)
    } catch (error) {
      console.log(error)
    }

    this.session.setData('key1', 'hola mundo ')
    this.session.setData('key2', 'hola mundo 2')

    console.log(this.session.getSessionVars())

     

    this.http.getData('http://localhost:3000/api/v1/usuarios?id_compania=1').subscribe(
      res=>{
        if(res['code']===0){
          this.body=res['body']
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

    jsreport.serverUrl = 'http://192.168.0.4:5488'

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

  getDate(){
    
    this.today = this.functions.dateForm(this.today)
    console.log(this.today)
   
  }

  getDateToday(){
    this.today = new Date()
  }

  
}
