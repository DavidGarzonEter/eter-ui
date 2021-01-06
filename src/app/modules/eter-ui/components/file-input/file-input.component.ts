import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileFormsService } from '../../../services/file-forms.service';
import { HttpService } from '../../../services/http.service';
import imagenPdf from './imagenes/pdf'
import imagenDoc from './imagenes/doc'
import imagenFondoTransparente from './imagenes/fondoTransparente'
import Compressor from 'compressorjs';
import { MessageService } from '../../../services/message.service';

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

  size = 100000 //tamaño a comprimir las imagenes en bites 
    
  @Input()params
   @Output() fileSave = new EventEmitter<any>()
 
  typeFile
 
  file=null
  @Input()icon = 'folder'
  constructor( 
    private fileForms: FileFormsService,
    private http : HttpService,
    private message : MessageService
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

  async fileChange($event: Event){

    if($event.target['files'][0]['size'] < 15000000){
      let r   
      if($event.target['files'] && $event.target['files'][0]){   
        this.file = $event.target['files'][0];              
        switch (this.typeFile) {
          case 'pdf':
            r=false       
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
            r = await this.compressor()
            break;
  
          case 'doc':
            r=false
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
      
      if(r == false){
        this.fileSave.emit({new:this.file})
      }else{      
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(r); 
      this.fileSave.emit({new:this.file, compressor:r})
      }

    }else{
      this.message.Error('Error', 'Archivo muy pesado, tamaño mínimo 15 MB')
    }
 
  }

  compressor(){
    if(this.file.size > 500000 && this.file.size < 15000000){
      let factor = (this.size*100)/this.file.size  
      let y = ((factor**3)*(10**-6))-(0.00059*(factor**2))+(0.0399*factor)
      return new Promise((resolve,reject)=>{  
        new Compressor (this.file, {
            quality: y,
            success(result){     
              resolve(result)   
            }
           })
      
      })

    }else{
      return (false)
    }
   
  
  }

 

 

}
