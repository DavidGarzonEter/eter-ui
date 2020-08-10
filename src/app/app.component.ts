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
import { fileInputParams } from './modules/interfaces/file-forms-service/file-input-params';
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
  combosConfig: CombosConfiguration =
    {
      visibleField: 'nombre',
      urlCombo:'http://localhost:3000/api/v1/usuarios/combo',
      selectionField: 'cedula',
      urlParams: [
        {id:'id_compania', value:1}]
    }

    //tabla

  recargarTabla = new EventEmitter<any>()

  configurationTable: TableConfiguration = {
    edit: true,
    add: true,
    delete: true,
    selectable: true,
    addPer: false,
    editPer: false,
    primaryKey: 'id'
  }

  columnasCofig: TableColumns[] = [
        {
      ID: 'nombre',
      label: 'nombre',
      type: 'text',
      style: {
        textAlign: 'center'
      }
    },
    {
      ID: 'codigo',
      label: 'Codigo',
      type: 'text',
      style: {
        textAlign: 'center'
      },
    },
    {
      ID: 'descripcion',
      label: 'Descripcion ',
      type: 'text',
      style: {
        textAlign: 'center'
      }
    },

    {
      ID:'responsable',
      label:'Responsable',
      type:'combo',     
      paramsCombo:{
        selectionField:'cedula',
        url:'http://localhost:3000/api/v1/usuarios/combo',
        urlParams: [
          {id:'id_compania',value:1}
        ],
        visibleField:'nombre'
      },
      style:{
        textAlign:'center', //text-align
      }
    }

  ]
  body = []

  params = [   
    {
      id:'id_compania',
      value:'1'
    }
]




  constructor(
    private session: SessionService,
    private message: MessageService,
    private crypt: CryptoService,
    private http: HttpService,
    private fileForms: FileFormsService,
    private functions : FunctionsService
  ) { }

  async ngOnInit() {

    this.message.openLoading('Cargando','Cargando...')
/* 
    setTimeout(() => {
      this.message.closeLoading()
    }, 2000); */

    this.session.setData('key1', 'hola mundo ')
    this.session.setData('key2', 'hola mundo 2')

    console.log(this.session.getSessionVars())


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
    console.log('eliminar', $event[0]['id'])    
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

  //input file

  size= ((screen.height+screen.width)/2)

  fileInput: fileInputParams = {
    typeFile:"imagen",
    input:"vista",
    label:"foto",
    imageSrc:'http://localhost:3000/api/v1/docs/1596025421267.png', 
    edit:true,     
    style:{
      width:'30%',
      border:'1px solid black',
      shape:'circular'      
     
    }
  }

  fileSave($event){
    console.log($event)

  }

  
}
