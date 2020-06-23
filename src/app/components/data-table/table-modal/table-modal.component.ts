import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {

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

    console.log(this.data)
    
  }

}
