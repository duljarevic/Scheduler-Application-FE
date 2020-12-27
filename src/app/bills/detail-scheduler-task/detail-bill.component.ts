import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SchedulerTask} from '../../model/schedulerTask';
import {Subscription} from 'rxjs';
import * as calendarTranslation from '../../core/calendar-translation';
import {BoInteractionService} from '../../core/bo-interaction.service';
import {environment} from '../../../environments/environment';
import {BillsService} from '../../services/bills.service';
import {InteractionObject} from '../../../shared/interaction-object';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-detail-scheduler-task',
  templateUrl: './detail-scheduler-task.component.html'
})
export class DetailSchedulerTaskComponent implements OnInit, OnDestroy {

  public bill: SchedulerTask;


  @Output() billDetailEvent = new EventEmitter();

  @ViewChild('billDetail') form;

  public mode: string;
  public active: boolean;
  public errorMessage: string;

  protected formChanged = false;
  protected formChangeTracking = false;

  lang: any;

  private subscription1: Subscription;
  protected formChangeSub: Subscription;

  constructor(private _interactionService: BoInteractionService, private _billsService: BillsService,
              private _messageService: MessageService) {
    this.lang = calendarTranslation.sr;

    this.subscription1 = this._interactionService.boEdit$.subscribe(
      r => {
        if (r.className === 'view-bills') {
          console.log('subscribeeeeeeeee location ' + r);
          this.bill = r.object;
          this.mode = r.actionType;
          this.refreshForm();
        }
      }
    );
  }

  ngOnInit() {
  }


  saveBill() {
    if (this.mode === 'new') {
      this._billsService.create(this.bill)
        .subscribe(res => {
            this.bill = res;
            this.mode = 'edit';
            let io = new InteractionObject('save', this.bill, 'view-bills');
            // this._interactionService.setBoSaved(io);
            this.billDetailEvent.emit(io);
            setTimeout(() => {
              this.formChanged = false;
            }, 500);
            this.active = false;
            this._messageService.showSuccessSaveMsg();
          },
          error => {
            this._messageService.showFailMsgText(this.errorMessage);
          });
    }
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }


  refreshForm() {
    console.log('refreshForm ' + this.formChangeTracking);
    if (this.formChangeTracking) {
      if (this.formChangeSub) {
        this.deactivateChangeTracking();
      }
    }
    this.active = false;
    setTimeout(() => {
        this.active = true;
        this.formChanged = false;
        if (this.formChangeTracking) {
          setTimeout(() => {
            this.activateChangeTracking();
          }, 500);
        }

      },
      0);
  }


  deactivateChangeTracking() {
    try {
      if (environment.SHOW_CONSOLE_MSG) {
        console.log('deactivateChangeTracking start');
      }
      if (this.formChangeSub) {
        if (environment.SHOW_CONSOLE_MSG) {
          console.log('deactivateChangeTracking start');
        }
        this.formChangeSub.unsubscribe();
        this.formChangeSub = null;
        if (environment.SHOW_CONSOLE_MSG) {
          console.log('deactivateChangeTracking unsubscribed');
        }
      }
      if (environment.SHOW_CONSOLE_MSG) {
        console.log('deactivateChangeTracking end');
      }
    } catch (err) {
      if (environment.SHOW_CONSOLE_MSG) {
        console.log(err);
      }
    }
  }


  activateChangeTracking() {
    if (environment.SHOW_CONSOLE_MSG) {
      console.log('activateChangeTracking');
    }
    if (!this.formChangeSub) {
      this.formChangeSub = this.form.control.valueChanges
        .subscribe(values => {
            if (environment.SHOW_CONSOLE_MSG) {
              console.log('form changeddddddddd');
              console.log(values);
            }
            this.formChanged = true;
          }
        );
    }
  }


}
