import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
    
  ) { }

  getData(url:string){
    return this.http.get<any>(url)
  }

  postData(url,body){
    return this.http.post<any>(url, body)
  }

}
