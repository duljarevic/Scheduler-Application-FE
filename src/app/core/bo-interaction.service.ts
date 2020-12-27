import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {InteractionObject} from '../../shared/interaction-object';

@Injectable()
export class BoInteractionService {

  // Observable sources
  private boEditSource = new Subject<InteractionObject>();
  private boSavedSource = new Subject<InteractionObject>();
  private boDeletedSource = new Subject<InteractionObject>();

  // Observable source bs_view_model

  private bsViewModelEditSource = new Subject<InteractionObject>();
  private bsViewModelSavedSource = new Subject<InteractionObject>();
  private bsViewModelDeletedSource = new Subject<InteractionObject>();

  boEdit$ = this.boEditSource.asObservable();
  boSaved$ = this.boSavedSource.asObservable();
  boDeleted$ = this.boDeletedSource.asObservable();


  bsViewModelEdit$ = this.bsViewModelEditSource.asObservable();
  bsViewModelSaved$ = this.bsViewModelSavedSource.asObservable();
  bsViewModelDeleted$ = this.bsViewModelDeletedSource.asObservable();


  private caseHeaderTabSource = new Subject<number>();
  caseHeaderTab$ = this.caseHeaderTabSource.asObservable();

  setSelectedBo(io: InteractionObject) {
    this.boEditSource.next(io);
  }

  setBoSaved(io: InteractionObject) {
    this.boSavedSource.next(io);
  }

  setBoDeleted(io: InteractionObject) {
    this.boDeletedSource.next(io);
  }


  setSelectedBsViewModel(io: InteractionObject) {
    console.log('********************* setSelectedBsViewModel(io: InteractionObject)  ************');
    console.log('********************* setSelectedBsViewModel(io: InteractionObject)  ************' + io.actionType);

    this.bsViewModelEditSource.next(io);
  }

  setBsViewModelSaved(io: InteractionObject) {
    this.bsViewModelSavedSource.next(io);
  }

  setBsViewModelDeleted(io: InteractionObject) {
    this.bsViewModelDeletedSource.next(io);
  }

}
