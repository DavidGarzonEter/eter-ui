import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private loading
  constructor(
    private dialog:MatDialog
  ) { }

  openLoading(title,message){
    
    this.loading = this.dialog.open(LoadingComponent, {
      data:{
        title,
        message
      },
      width:'250px',
      // height:'280px',
      disableClose:true,
      
    })
  }

  closeLoading(){
    this.loading.close()
  }

  Error(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    return new Promise((resolve,reject)=>{
      Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          confirmButton: 'confirm-button-class',
          cancelButton: 'cancel-button-class',
        }
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(false)
        }
      })
    })
  }

  Success(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){

    return new Promise((resolve,reject)=>{
      Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          confirmButton: 'confirm-button-class',
          cancelButton: 'cancel-button-class',
        }
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(false)
        }
      })
    })
  }

  Warning(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    return new Promise((resolve,reject)=>{
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          confirmButton: 'confirm-button-class',
          cancelButton: 'cancel-button-class',
        }
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(false)
        }
      })
    })
  }

  Info(title:string, message:string, showCancelButton:boolean=false,confirmButtonText:string='Aceptar', cancelButtonText:string='Cancelar'){
    return new Promise((resolve,reject)=>{
      Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          confirmButton: 'confirm-button-class',
          cancelButton: 'cancel-button-class',
        }
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(false)
        }
      })
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
