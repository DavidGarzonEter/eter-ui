import { Component, OnInit } from '@angular/core';
import { SessionService } from './modules/services/session.service';
import { MessageService } from './modules/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eter-ui';

  constructor(
    private session : SessionService,
    private message : MessageService
  ){}

  ngOnInit(){
  
    // this.message.Error('Error', 'error')
    this.message.WarningToast('success',2000)
    
  }
  
}
