import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }


  dateForm (date) {       
   let data = new Date(date)
   let change = `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`       
    return (change)  
  }

  dateIso (date) {    
    let data = date.toString();
    let cut = data.replace(/(.*)\T.*/, '$1') 
    let add  = `${cut}T05:00:00.000Z`
    let fecha = add.replace(/(.*)\T.*/, '$1')
    return (fecha)  
  }
}
