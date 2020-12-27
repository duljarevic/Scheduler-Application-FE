import {Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Bills} from '../../model/bills';
import {Table} from 'primeng/table';
import {BillsService} from '../../services/bills.service';
import {InteractionObject} from '../../../shared/interaction-object';
import {TabControllerService} from '../../core/tab-controller.service';
import {BoInteractionService} from '../../core/bo-interaction.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit, OnDestroy {


  @Output() billsEvent = new EventEmitter();

  public bills: Bills[];

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
    'kolicina': null,
    'cena': null,
    'poreskaOsnovica': null,
    'sptopaPDV': null,
    'iznosPDV': null
  };

  dateFilterMap = {};
  tfDateFilterMap = {};
  booleanFilterMap = {};


  private subscription1: Subscription;
  private subscription2: Subscription;
  // private subscription3: Subscription;


  private cmpDomainName = 'view-bills';

  constructor(private _billsService: BillsService, private _tabControllerService: TabControllerService,
              private _interactionService: BoInteractionService) {

    this.subscription1 = this._interactionService.boSaved$.subscribe(
      r => {
        if (r.className === this.cmpDomainName) {
          console.log('subscribeeeeeeeee saveeeee ');
          this.bills = r.object;
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

    // this.subscription3 = this._interactionService.boEdit$.subscribe(
    //   r => {
    //     console.log('SuBBBBBbbbbBBBbbbbBBBbbbBBBB ' + r.className);
    //     if (r.className === this.cmpDomainName) {
    //       this.selectedMode = r.actionType;
    //       this.bills = r.object;
    //       this.getBills();
    //     }
    //   }
    // );
  }

  ngOnInit() {
    this.getBills();
  }


  getBills() {
    this._billsService.getBills().subscribe(billsRes =>
        this.bills = billsRes,
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

  showDeleteDlg(obj: Bills) {
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


  view(obj: Bills) {
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
    debugger;
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
    // if (this.subscription3) {
    //   this.subscription3.unsubscribe();
    // }
  }

}
