import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/modules/services/http.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {

  modalForm= {}
  dataCombo

  constructor(
    public dialogRef: MatDialogRef<TableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder : FormBuilder,
    private http : HttpService
    
    )
    {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  ngOnInit(): void {
    
    let columns = this.data.columns
    console.log(this.data.columns)


    this.data.columns.forEach(element => {  
   

      let text = `{"${element.ID}":""}`
      let json = JSON.parse(text)
      Object.assign(this.modalForm,json)

      if(this.data.action=='edit'){
        this.modalForm[element.ID] = element.value 
      }

      
      if(element.paramsCombo){

        this.http.getData(element.paramsCombo.url).subscribe(
          res=>{
            if(res['code']===0){
              this.dataCombo=res['body']
              console.log(this.dataCombo)
            }
          }
        )
       
        
      }  

     

      console.log(element) 
      
    });

    
   


  }

  onSubmit(){
    this.dialogRef.close(this.modalForm)
  }

  onChange(id, $event){
    
    console.log($event, id)
    this.modalForm[id] = $event
    


  }

}
