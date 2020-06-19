import { Component, OnInit } from '@angular/core';
import { HttpService } from '../testApi/services/http.service';
import { MessageService } from 'src/app/modules/services/message.service';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit {

  constructor(
    private _httpService : HttpService,
    private message : MessageService
  ) { }

  url = 'http://localhost:3000/usuarios'

  ngOnInit(): void {

    this._httpService.getData(this.url).subscribe(
      res=>{
        console.log(res)
        if(res.status === 0){
          this.message.Success('Correcto!',  res.message)
        }else{
          this.message.Error('Error!',  res.message)
        }
      },
      err=>{
        this.message.Error('Error!',  err)
      }
    )
  
  }

}
