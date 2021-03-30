import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableModalComponent } from './table-modal/table-modal.component';
import { HttpService } from '../../../services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '../../../services/message.service';
import { FunctionsService } from '../../../services/functions.service';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {TooltipPosition} from '@angular/material/tooltip';

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;
  
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}


@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() title
  @Input() columns
  @Input() data:any = []
  @Input() combo
  @Input() configuration = {
    add :false,
    edit:false,
    delete:false,
    selectable:false,
    addPer:false,
    editPer:false,
    primaryKey:'id'
  }
  @Input() reloadTable : EventEmitter<any>
  @Input() url:string
  @Input() params

  @Output() clickRow = new EventEmitter<any>() 
  @Output() add = new EventEmitter<any>() 
  @Output() edit = new EventEmitter<any>() 
  @Output() delete = new EventEmitter<any>() 
  @Output() selected = new EventEmitter<any>() 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  selectedRows=[] /** almacena las filas seleccionadas */
  checkboxs={}
  selectAll = false
  indeterminateState = false
  filters
  originalData = []
  paginatorActive=true

  
  id_compania

  pageSizeOptions: number[] = [
    5, 10, 25, 50, 100
  ]

  pageSize = 5;
  length= 0;

  page=0

  above: TooltipPosition[] = ['above'];

  constructor(
    public dialog: MatDialog,
    private http : HttpService,
    private message : MessageService,
    private functionEter : FunctionsService,
    private paginatorTranslate: MatPaginatorIntl,
  ) { 
    this.paginatorTranslate.itemsPerPageLabel = "Elementos por página"
    this.paginatorTranslate.nextPageLabel = "Siguiente página"
    this.paginatorTranslate.lastPageLabel = "Última página"
    this.paginatorTranslate.previousPageLabel = "Página anterior"
    this.paginatorTranslate.firstPageLabel = "Primera página"
    this.paginatorTranslate.getRangeLabel = spanishRangeLabel
  }


  
  async ngOnInit() {
  
  
    this.params.push(
      {
        id:'page',
        value:'0'
      },
      {
        id:'per_page',
        value:'5'
      },
      {
        id:'filter',
        value:''
      }
    )  
    
    if(this.reloadTable){
      this.reloadTable.subscribe(res=>{
        console.log(res)
        this.originalData=[]
        this.selectAll=false
        this.seletecAllEvent('')
      })

    }
    
    if(this.url){
      
      try {
        console.log('url:',this.url)

      let service = await this.http.getDataPromise(`${this.url}`, this.params)
        this.data = service['body']['data']
        this.length = service['body']['count']
        this.chageFecha()   

        if(service['code']===0){         
            setTimeout(() => {
            this.message.closeLoading()          
          }, 500);
        }   
        
        this.data.forEach(row => {          
          this.checkboxs[row[this.configuration.primaryKey]]=false          
        });  
        
      } catch (error) {
        console.log(error)
      }

      
    }else{
      this.paginatorActive=false
    }


  }
 
  chageFecha(){
    this.columns.forEach((element, index) => {          
      if(element.type=='fecha'){
        let type = element.ID
        this.data.forEach((element, index) => {
         console.log(this.data[index])
         this.data[index][type] = this.functionEter.dateIso(element[type])            
        });
     
      }          
    });
  
   
  }

  ngOnChanges(changes:SimpleChanges){
    
    if(changes.data){      
      
      if(this.data){
        this.data.forEach(row => {          
          this.checkboxs[row[this.configuration.primaryKey]]=false          
        });  
        console.log(this.checkboxs)      
  
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

    this.checkboxs[row[this.configuration.primaryKey]]=$event.checked
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

  async seletecAllEvent($event){

  
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
    
    let service = await this.http.getDataPromise(`${this.url}`, this.params)
    this.data = service['body']['data']
    this.length = service['body']['count']
    this.chageFecha()   

  }
  changeFilters(){   


    if(this.url){ 
   

      // console.log(this.filters)
    
      this.params.forEach((element, index) => {
        if(element.id=='filter'){
          element.value = this.filters   
        }    
      });
   this.http.getData(`${this.url}`, this.params).subscribe(
        res=>{
          this.data = res['body']['data']
          this.chageFecha()
          if(this.filters == ''){
            this.length = res['body']['count']           
          }else{
            this.length = this.data.length
          }
          
       },
        err=>{
          console.log(err)
        }
      )
      
    }else{
      this.data = this.originalData.filter(data =>{
        for(let key of Object.keys(data)){
  
          let result = data[key].toString().toLowerCase().includes(this.filters.toLowerCase())
          if(result){
            // console.log(data)
            return data
          }
  
        }
  
      })
    }


  }

  changePage($event){

    console.log(this.length)

    console.log($event)

    this.params.forEach((element, index) => {
      if(element.id=='per_page'){
        element.value =  $event.pageSize 
        
      }   
      if(element.id=='page'){
        element.value =  $event.pageIndex  
      }  
    });
    
    this.http.getData(`${this.url}`, this.params).subscribe(
      res=>{
        console.log(res)
        this.data = res['body']['data']
        this.chageFecha() 
        
      },
      err=>{
        console.log(err)
      }
    )

  }


}
