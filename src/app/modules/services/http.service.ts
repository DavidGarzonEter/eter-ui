import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
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

  getDataPromise(url:string){
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(
        res=>resolve(res),
        err=>reject(err)
      )
    })
  }

  postDataPromise(url:string,body:any){
    return new Promise((resolve,reject)=>{
      this.http.post(url,body).subscribe(
        res=>resolve(res),
        err=>reject(err)
      )
    })
  }

  putDataPromise(url:string,body:any){
    return new Promise((resolve,reject)=>{
      this.http.put(url,body).subscribe(
        res=>resolve(res),
        err=>reject(err)
      )
    })
  }

  deleteDataPromise(url:string){
    return new Promise((resolve,reject)=>{
      this.http.delete(url).subscribe(
        res=>resolve(res),
        err=>reject(err)
      )
    })
  }

}
