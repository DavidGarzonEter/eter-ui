import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {

  selected

  @Input() dataCombos :any
  @Input() configuration:any

  combo

  @Output() changeOption = new EventEmitter<any>()  

  
  constructor() { }

  ngOnInit(): void {
    this.combo = this.configuration[0].ID

  }

  selecteData(e){        
    this.changeOption.emit(e)  
  }


}
