import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() columnas:any
  @Input() datos:any




  constructor() { }

  ngOnInit(): void {
    
  }

}
