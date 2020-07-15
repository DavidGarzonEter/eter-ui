import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {

  modalForm = {}
  dataCombo = {}

  constructor(
    public dialogRef: MatDialogRef<TableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder : FormBuilder,
    private http : HttpClient
    
    )
    {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  ngOnInit(): void {
    
    let columns = this.data.columns
    // console.log(this.data.columns)


    this.data.columns.forEach((element,index) => {  
   
      
      let text = `{"${element.ID}":""}`
      let json = JSON.parse(text)
      Object.assign(this.modalForm,json)

      if (element.type == 'combo') {
        Object.assign(this.dataCombo,json)
      }

      if(this.data.action=='edit'){
        this.modalForm[element.ID] = element.value 
        // console.log(element.value)
      }

      // console.log('formulario',this.modalForm)
      
      if(element.paramsCombo){

        this.http.get(element.paramsCombo.url).subscribe(
          res=>{
            if(res['code']===0){
              this.dataCombo[element.ID]=res['body']
              // console.log(this.dataCombo)

              this.dataCombo[element.ID].forEach(data => {
                // console.log(data[element.paramsCombo.visibleField], element.value)
                if(data[element.paramsCombo.visibleField]==element.value){
                  this.modalForm[element.ID]=data[element.paramsCombo.selectionField]
                  this.data.columns[index].value = data[element.paramsCombo.selectionField].toString()
                }
              });

            }
          }
        )
       
        
      }  

     

      console.log(element) 
      
    });

    console.log(this.data.columns)

    
   


  }

  onSubmit(){
    this.dialogRef.close(this.modalForm)
  }

  onChange(id, $event){
    
    console.log($event, id)
    this.modalForm[id] = $event
    


  }

}
