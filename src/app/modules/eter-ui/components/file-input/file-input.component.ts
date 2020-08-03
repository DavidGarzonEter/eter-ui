import { Component, OnInit, Input } from '@angular/core';
import { FileFormsService } from '../../../services/file-forms.service';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {


  file

  @Input()icon = 'folder'
  constructor( 
    private fileForms: FileFormsService
  ) {}

  ngOnInit(): void {
  }

  fileChange($event){    
  this.file=$event.target.files[0]
  }

  onSubmit(){
    
    let form = this.fileForms.createMultipartForm(this.file)
    console.log(form)

    
    
  }

}
