import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {

  modalForm= {}

  constructor(
    public dialogRef: MatDialogRef<TableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder : FormBuilder)
    {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  ngOnInit(): void {

    
    let columns = this.data.columns

    this.data.columns.forEach(element => {        
      let text = `{"${element.ID}":""}`
      let json = JSON.parse(text)
      Object.assign(this.modalForm,json)
    });

    
  }

  onSubmit(){
    this.dialogRef.close(this.modalForm)
  }

  onChange(id, $event){

    this.modalForm[id] = $event


  }

}
