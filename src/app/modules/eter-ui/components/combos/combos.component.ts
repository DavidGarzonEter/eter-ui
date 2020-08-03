import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {

  @Input() dataCombos :any
  @Input() configuration:any
 

  @Output() changeOption = new EventEmitter<any>()  

  
  constructor(
    private http : HttpService
  ) { }

  ngOnInit(): void {

    if(this.configuration.urlCombo){

      this.http.getData(this.configuration.urlCombo,this.configuration.urlParams).subscribe(
        res=>{
          if(res['code']===0){
            this.dataCombos=res['body']
          }else{
            console.log('error en la consulta para datos combo')
          }         
        },err=>{
          console.log(err)
        }
      )
    
    }
    console.log(this.configuration)

  }

  selectedData($event){    
    this.changeOption.emit($event.value)  
  }


}
