import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {TabControllerService} from '../core/tab-controller.service';
import {BoInteractionService} from '../core/bo-interaction.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  board: string;
  errorMessage: string;

  info: any;

  public actionMode: string;


  public tabIndex = 0;
  public tabIndex1 = 0;
  public tabIndex2 = 0;
  public tabIndex3 = 0;
  public tabIndex4 = 0;


  tab000 = true;
  tab001 = false;

  subscriptionTabIndex: Subscription;
  subscriptionTab001: Subscription;

  private cmpRefs = [];

  private componentChanged = false;

  displaySaveDlg = false;

  constructor(private userService: UserService, private token: TokenStorageService,
              private _tabControllerService: TabControllerService, private _interactionService: BoInteractionService) {
    this.subscriptionTabIndex = _tabControllerService.tabIndex$.subscribe(
      tabIndexV => {
        this.tabIndex = tabIndexV;
        setTimeout(() => {
          }, 500
        );
      }
    );

    this.subscriptionTab001 = _tabControllerService.tab001$.subscribe(
      r => {
        this.tab001 = r;
      }
    );
  }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }


  onTabChange(event) {
    this.actionMode = 'tab';
    let oldTabIndex = this.tabIndex;
    this.tabIndex = event.index;
    if (this.cmpRefs) {
      for (let i = 0; i < this.cmpRefs.length; i++) {
        let cr = this.cmpRefs[i];
        if (typeof cr.isFormChanged === 'function') {
          this.componentChanged = cr.isFormChanged();
        }
        // console.log(this.componentChanged);
        if (this.componentChanged) {
          this.displaySaveDlg = true;
          setTimeout(() => {
            this.tabIndex = oldTabIndex;
          }, 200);
          break;
        } else {
          this.displaySaveDlg = false;
        }
      }
    }
  }


  schedulerTasksListEvent(obj) {
    this.schedulerTasksListEventCustom(obj);
  }

  schedulerTaskDetailEvent(obj) {
    this.schedulerTasksDetailEventCustom(obj);
  }


  schedulerTasksDetailEventCustom(obj) {
    this._tabControllerService.showTab001(false);
    this._tabControllerService.setTabIndex(0);
    setTimeout(() => {
      this._interactionService.setBoSaved(obj);
    }, 0);
  }

  schedulerTasksListEventCustom(obj) {
    this._tabControllerService.showTab001(true);
    this._tabControllerService.setTabIndex(1);
    setTimeout(() => {
      this._interactionService.setSelectedBo(obj);
    }, 0);
  }

  ngOnDestroy() {
    this.subscriptionTabIndex.unsubscribe();
    this.subscriptionTab001.unsubscribe();
  }

}
