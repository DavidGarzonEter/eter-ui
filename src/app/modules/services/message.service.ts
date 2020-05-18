import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  Error(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    })
  }

  Success(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){

    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    })
  }

  Warning(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    })
  }

  Info(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    })
  }

  SuccessToast(message:string, duration:number = 4000){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      toast:true,
      timer: duration
    })
  }

  ErrorToast(message:string, duration:number = 4000){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      toast:true,
      timer: duration
    })
  }

  WarningToast(message:string, duration:number = 4000){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      toast:true,
      timer: duration
    })
  }

  InfoToast(message:string, duration:number = 4000){
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: message,
      showConfirmButton: false,
      toast:true,
      timer: duration
    })
  }

}
