import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {

  @Input() dataCombos :any
  @Input() configuration:any

  @Output() changeOption = new EventEmitter<any>()  

  
  constructor() { }

  ngOnInit(): void {

  }

  selectedData($event){    
    
    // console.log($event.value)
    this.changeOption.emit($event.value)  
  }


}
