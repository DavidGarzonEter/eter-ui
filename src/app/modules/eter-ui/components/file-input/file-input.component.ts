import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileFormsService } from '../../../services/file-forms.service';
import { HttpService } from '../../../services/http.service';
import imagenPdf from './imagenes/pdf'
import imagenDoc from './imagenes/doc'
import imagenFondoTransparente from './imagenes/fondoTransparente'



@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  styleImg
  type
  border
  imageSrc
  styleForm
  sizePicture
  edit
    
  @Input()params
   @Output() fileSave = new EventEmitter<any>()
 
  typeFile
 
  file=null
  @Input()icon = 'folder'
  constructor( 
    private fileForms: FileFormsService,
    private http : HttpService
  ) {}

  ngOnInit(): void { 

    this.sizePicture={
      width:`${this.params.style.width}`,
      height:`${this.params.style.height}`,
      "border-radius":'5%',
      border:`${this.params.style.border}`,
    } 

    if(this.params.edit == true){
      this.edit = 'img'
    }else{
      this.edit = ''
    }

        
  
    this.typeFile= this.params.typeFile
    this.functionTypeFile() 
    

  }

  functionTypeFile(){

    if(this.params.style.shape == "circular"){   

      this.sizePicture['border-radius']="50%"
      this.sizePicture.width=`${screen.width*(this.params.style.width.replace('%', '')/100)}px`
      this.sizePicture.height = this.sizePicture.width
   
    }
      
    this.border ={
      "borderRadius":`${this.sizePicture['border-radius']}`
    } 

    this.styleForm={
      width:`${this.params.style.width}`,
      height:`${this.params.style.height}`
    }

    this.styleImg = {
      width:'100%',
      height: '100%', 
      "border-radius":`${this.sizePicture['border-radius']}`,
    }  

    switch (this.typeFile) {
      case 'imagen':  
        if(!this.params.imageSrc){        
          this.imageSrc=imagenFondoTransparente           
        }else{
          this.imageSrc=this.params.imageSrc
        }
        this.type='image/*'
             
        break;
      case 'pdf':    
        this.type='.pdf' 
        this.imageSrc=imagenFondoTransparente    
      
      break;
      case 'doc':
        this.type='.doc, .docx'
        this.imageSrc=imagenFondoTransparente
        
      break;
    
      default:
        break;
    }
  }

  fileChange($event: Event){

    if($event.target['files'] && $event.target['files'][0]){    

      this.file = $event.target['files'][0];
   
      
      switch (this.typeFile) {
        case 'pdf':
        this.styleImg={
            width:'100%',
            height: '100%', 
            "border-radius":`${this.sizePicture['border-radius']}`,
            "background-image": `url(${imagenPdf})`,
            "background-position": "center",
            "background-size": "30% 65%",
            "background-repeat": "no-repeat" 
          }
         
          break;

        case 'imagen':      
       
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(this.file);  
          break;

        case 'doc':
          this.styleImg={
            width:'100%',
            height: '100%', 
            "border-radius":`${this.sizePicture['border-radius']}`,
            "background-image": `url(${imagenDoc})`,
            "background-position": "center",
            "background-size": "30% 65%",
            "background-repeat": "no-repeat" 
          }        

        break;
        default:
          break;
      }

    }

   this.fileSave.emit({new:this.file})

  
  }

 

 

}
