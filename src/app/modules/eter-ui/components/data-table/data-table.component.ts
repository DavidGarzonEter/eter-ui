import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { TableModalComponent } from './table-modal/table-modal.component';


@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() title
  @Input() columns
  @Input() data:any
  @Input() configuration = {
    add :false,
    edit:false,
    delete:false,
    selectable:false,
    addPer:false,
    editPer:false,
  }
  @Input() reloadTable : EventEmitter<any>

  @Output() clickRow = new EventEmitter<any>() 
  @Output() add = new EventEmitter<any>() 
  @Output() edit = new EventEmitter<any>() 
  @Output() delete = new EventEmitter<any>() 
  @Output() selected = new EventEmitter<any>() 
  


  selectedRows=[] /** almacena las filas seleccionadas */
  checkboxs={}
  selectAll = false
  indeterminateState = false
  filters
  originalData = []




  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if(this.reloadTable){
      this.reloadTable.subscribe(res=>{
        console.log(res)
        this.originalData=[]
        this.selectAll=false
        this.seletecAllEvent('')
      })
    }


  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.data){      
      
      if(this.data){
        this.data.forEach(row => {
          this.checkboxs[row.id]=false
        });  
        // console.log(this.checkboxs)}      
  
        if(this.originalData.length==0){
          let data  = this.data
          data.forEach(element => {
            this.originalData.push(element)
          });
          // console.log(this.originalData)
        }
      }

    }

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

            // console.log(columns)

            

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
                this.edit.emit({new:result, old:this.selectedRows[0]})
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

    // debugger;

    this.checkboxs[row.id]=$event.checked

    // console.log(this.checkboxs)

    if($event.checked){
      this.selectedRows.push(row)
    }else{
      let index = this.selectedRows.indexOf(row)
      this.selectedRows.splice(index,1)
    }
    
    if(this.configuration.selectable){  
      this.selected.emit(this.selectedRows)
    }

    if(this.selectedRows.length == this.data.length){
      this.selectAll = true
    }else{
      this.selectAll = false
    }

    if(this.selectedRows.length>0 && this.selectedRows.length<this.data.length){
      this.indeterminateState=true
    }else{
      this.indeterminateState=false
    }
    

  }

  clicked($event){
    event.stopPropagation();
  }

  seletecAllEvent($event){

    this.indeterminateState=false

    if(this.selectAll){
      Object.keys(this.checkboxs).forEach((key)=>{
        this.checkboxs[key]=true
      })

      this.selectedRows=[]
      let data  = this.data
      data.forEach(element => {
        this.selectedRows.push(element)
      });

      this.selected.emit(this.selectedRows)

    }else{
      Object.keys(this.checkboxs).forEach((key)=>{
        this.checkboxs[key]=false
      })

      this.selectedRows = []
      this.selected.emit(this.selectedRows)

    }

  }
  changeFilters(){
    // console.log(this.filters)


    this.data = this.originalData.filter(data =>{
      for(let key of Object.keys(data)){

        let result = data[key].toString().toLowerCase().includes(this.filters.toLowerCase())
        if(result){
          // console.log(data)
          return data
        }

      }

    })

    // console.log(this.data)
    // console.log(this.originalData)


  }


}
