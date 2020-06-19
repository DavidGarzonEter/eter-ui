import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient
  ) { }


  getData(url:string){
    return this.http.get(url)
  }

  postData(url:string, body:any){
    return this.http.post(url,body)
  }

  putData(url:string, body:any){
    return this.http.put(url,body)
  }

  deleteData(url:string){
    return this.http.delete(url)
  }

}
