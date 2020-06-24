import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableConfiguration } from 'src/app/interfaces/data-table/table-configuration';
import { TableColumns } from 'src/app/interfaces/data-table/table-columns';
import { MatDialog } from '@angular/material/dialog';
import { TableModalComponent } from './table-modal/table-modal.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() columns:TableColumns
  @Input() data:any
  @Input() configuration:TableConfiguration = {
    add :false,
    edit:false,
    delete:false,
    addPer:false,
    editPer:false,
  }

  @Output() clickRow = new EventEmitter<any>() 
  @Output() add = new EventEmitter<any>() 



  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }

  clickOnRoW(rowData) {
    this.clickRow.emit(rowData)
  }

  action(action) {
    switch (action) {
      case 'add':

      if(this.configuration.addPer){
        this.add.emit('add new')
      }else{
        this.dialog.open(TableModalComponent, {
          data: {
            action,
            columns: this.columns
          }
        })
        .afterClosed().subscribe(result=>{          
          if(result){
            this.add.emit(result)
          }
        })
      }

        break;
    }




  }

}
