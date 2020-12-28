import {Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {SchedulerTask} from '../../model/schedulerTask';
import {Table} from 'primeng/table';
import {SchedulerTaskService} from '../../services/scheduler-task.service';
import {InteractionObject} from '../../../shared/interaction-object';
import {TabControllerService} from '../../core/tab-controller.service';
import {BoInteractionService} from '../../core/bo-interaction.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-scheduler-task',
  templateUrl: './view-scheduler-task.component.html',
  styleUrls: ['./view-scheduler-task.component.css']
})
export class ViewSchedulerTaskComponent implements OnInit, OnDestroy {


  @Output() billsEvent = new EventEmitter();

  public schedulerTasks: SchedulerTask[];

  public billId: number;

  @ViewChild('dt1') dataTable: Table;

  public displayDeleteDlg = false;

  public selectedObj: any;
  public selectedMode: string;
  public errorMessage: string;

  tfFilterMap = {
    'id': null,
    'vrstaDobraUsluge': null,
    'jedinicaMere': null,
    'kolicina': null
  };

  dateFilterMap = {};
  tfDateFilterMap = {};
  booleanFilterMap = {};

  private subscription1: Subscription;
  private subscription2: Subscription;
  // private subscription3: Subscription;

  private cmpDomainName = 'view-bills';

  constructor(private _billsService: SchedulerTaskService, private _tabControllerService: TabControllerService,
              private _interactionService: BoInteractionService) {

    this.subscription1 = this._interactionService.boSaved$.subscribe(
      r => {
        if (r.className === this.cmpDomainName) {
          console.log('subscribeeeeeeeee saveeeee ');
          this.schedulerTasks = r.object;
          this.getBills();
        }
      }
    );

    this.subscription2 = this._interactionService.boDeleted$.subscribe(
      r => {
        if (r.className === this.cmpDomainName) {
          console.log('subscribeeeeeeeee deleteeeee ');
          this.getBills();
        }
        this.dataTable.reset();
      }
    );
  }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this._billsService.getBills().subscribe(billsRes =>
        this.schedulerTasks = billsRes,
      error => this.errorMessage = <any>error);
  }

  create() {
    this.createCustom();
  }

  createCustom() {
    this.selectedObj = {};
    this.selectedMode = 'new';
    let io = new InteractionObject('new', this.selectedObj, 'view-bills');
    this.billsEvent.emit(io);
  }

  delete() {
    this.deleteCustom();
  }

  cancelDelete() {
    this.displayDeleteDlg = false;
  }

  showDeleteDlg(obj: SchedulerTask) {
    this.selectedObj = obj;
    this.billId = obj.id;
    this.displayDeleteDlg = true;
  }

  deleteCustom() {
    this._tabControllerService.setTabIndex(0);
    this._tabControllerService.showTab001(false);
    this._billsService.delete(this.selectedObj.id).subscribe(
      obj => {
        this.displayDeleteDlg = false;
        let io = new InteractionObject(this.selectedMode, this.selectedObj, this.cmpDomainName);
        this._interactionService.setBoDeleted(io);
      }
    );
  }


  view(obj: SchedulerTask) {
    this.viewCustom(obj);

  }

  viewCustom(obj: any) {
    this.selectedObj = obj;
    this.selectedMode = 'view';
    this._billsService.getBill(this.selectedObj.id).subscribe(
      obj => {
        this.selectedObj = obj;
        let io = new InteractionObject(this.selectedMode, this.selectedObj, this.cmpDomainName);
        this.billsEvent.emit(io);
      }
    );
  }


  filterTable() {
    let z1 = this.tfFilterMap;
    let z2 = this.dateFilterMap;
    let z3 = this.booleanFilterMap;
    let z4 = this.tfDateFilterMap;
    let dt1 = this.dataTable;

    dt1.filters = {};
    console.log(z1);
    if (z1) {
      Object.keys(z1).forEach(function (key) {
        console.log(key, z1[key]);
        if (z1[key] && z1[key].toLowerCase().includes(' or ') && z1[key].length > 4) {
          let l2 = z1[key].toLowerCase().split(' or ');
          dt1.filters[key] = {value: l2, matchMode: 'customInContains'};
        }
        else if (z1[key] && z1[key].startsWith('>')) {
          let val1 = z1[key].replace('>', '').trim();
          dt1.filters[key] = {value: val1, matchMode: 'gt'};
        } else if (z1[key] && z1[key].startsWith('<')) {
          let val1 = z1[key].replace('<', '').trim();
          dt1.filters[key] = {value: val1, matchMode: 'lt'};
        } else if (z1[key] && z1[key].startsWith('=')) {
          let val1 = z1[key].replace('=', '').trim();
          dt1.filters[key] = {value: val1, matchMode: 'equals'};
        } else {
          dt1.filters[key] = {value: z1[key], matchMode: 'contains'};
        }
      });
      this.getBills();
    }

  }

  ngOnDestroy(): void {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
