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
}
