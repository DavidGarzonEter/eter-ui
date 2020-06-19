import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.function();
  }

datos

function(){
  this.datos = ["Dato 1", "Dato 2", "Dato 3", "Dato 4", "Dato 5",] 
}

}
