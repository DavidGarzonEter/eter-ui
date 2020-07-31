import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileFormsService {

  constructor() { }

  createMultipartForm(file:File, params?){

    const formD = new FormData();
    formD.append('file',file,'form-data');//Asigna el campo File
    if(params){
      params.forEach((element:any) => {
        formD.append(element.id,element.value)
      });
    }
    return(formD)

  }

}
