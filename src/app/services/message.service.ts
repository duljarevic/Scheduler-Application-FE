import {Injectable} from '@angular/core';
import {Subject, Observable, forkJoin} from 'rxjs';
import {Message} from 'primeng/api';

@Injectable()
export class MessageService {

  // Observable msg sources
  private messageAnnouncedSource = new Subject<Message[]>();
  private messageAnnouncedDialogSource = new Subject<Message[]>();
  // Observable msg streams
  messageAnnounced$ = this.messageAnnouncedSource.asObservable();
  messageAnnouncedDialog$ = this.messageAnnouncedDialogSource.asObservable();

  constructor() {

  }

  addMessages(messages: Message[]) {
    console.log('msg addedddd');
    this.messageAnnouncedSource.next(messages);
  }

  showSuccessSaveMsg() {
        const msg = {
          severity: 'info',
          summary: 'INFO:',
          detail: 'Uspesno sačuvani podaci'
        };
        this.addMessages([msg]);
  }

  showFailMsgText(text: string) {
      const msg = {
        severity: 'error',
        summary: 'GRESKA:',
        detail: text
      };
      this.addMessages([msg]);
  }
}
