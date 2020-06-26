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
    selectable:false,
    addPer:false,
    editPer:false,
  }

  @Output() clickRow = new EventEmitter<any>() 
  @Output() add = new EventEmitter<any>() 
  @Output() edit = new EventEmitter<any>() 
  @Output() delete = new EventEmitter<any>() 
  @Output() selected = new EventEmitter<any>() 
  


  selectedRows=[] /** almacena las filas seleccionadas */


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
          },
          width:'60vh'
        })
        .afterClosed().subscribe(result=>{          
          if(result){
            this.add.emit(result)
          }
        })
      }

        break;

        case 'edit':
          if(this.configuration.editPer){
            this.edit.emit(this.selectedRows)
          }else{

            
            
            let columns:any
            columns = this.columns

            columns.forEach((column, index)=>{
            
              Object.keys(this.selectedRows[0]).forEach((key)=>{                                  
                if(column.ID==key){
                  columns[index].value = this.selectedRows[0][key]
                }
              })
            })

            console.log(columns)

            

            this.dialog.open(TableModalComponent, {
              data: {
                action,
                columns: this.columns,
                values: this.selectedRows[0]
              },
              width:'60vh'
            })
            .afterClosed().subscribe(result=>{          
              if(result){
                this.edit.emit(result)
              }
            })

          }


        break;
        
        case 'delete':
          this.delete.emit(this.selectedRows)
        break;
    }




  }

  selection(row, $event){

    if($event.checked){
      this.selectedRows.push(row)
    }else{
      let index = this.selectedRows.indexOf(row)
      this.selectedRows.splice(index,1)
    }
    
    if(this.configuration.selectable){  
      this.selected.emit(this.selectedRows)
    }

  }

  clicked($event){
    event.stopPropagation();
  }

}
