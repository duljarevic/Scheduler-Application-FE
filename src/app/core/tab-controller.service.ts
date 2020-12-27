import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
@Injectable()
export class TabControllerService {

  private tabIndexSource = new Subject<number>();
  private tabIndex1Source = new Subject<number>();
  private tabIndex2Source = new Subject<number>();
  private tabIndex3Source = new Subject<number>();
  private tabIndex4Source = new Subject<number>();
  private tabIndex5Source = new Subject<number>();
  private tabIndex6Source = new Subject<number>();
  private tabIndex7Source = new Subject<number>();
  private tabIndex8Source = new Subject<number>();


  private tab001Source = new Subject<boolean>();
  private tab002Source = new Subject<boolean>();
  private tab003Source = new Subject<boolean>();
  private tab004Source = new Subject<boolean>();
  private tab005Source = new Subject<boolean>();
  private tab006Source = new Subject<boolean>();
  private tab007Source = new Subject<boolean>();
  private tab008Source = new Subject<boolean>();


  tabIndex$ = this.tabIndexSource.asObservable();
  tabIndex1$ = this.tabIndex1Source.asObservable();
  tabIndex2$ = this.tabIndex2Source.asObservable();
  tabIndex3$ = this.tabIndex3Source.asObservable();
  tabIndex4$ = this.tabIndex4Source.asObservable();
  tabIndex5$ = this.tabIndex5Source.asObservable();
  tabIndex6$ = this.tabIndex6Source.asObservable();

  tab001$ = this.tab001Source.asObservable();
  tab002$ = this.tab002Source.asObservable();
  tab003$ = this.tab003Source.asObservable();
  tab004$ = this.tab004Source.asObservable();
  tab005$ = this.tab005Source.asObservable();
  tab006$ = this.tab006Source.asObservable();
  tab007$ = this.tab007Source.asObservable();
  tab008$ = this.tab008Source.asObservable();
  tab009$ = this.tab008Source.asObservable();
  tab010$ = this.tab008Source.asObservable();
  tab011$ = this.tab008Source.asObservable();

  setTabIndex(tabIndex: number) {

    this.tabIndexSource.next(tabIndex);
  }


  setTabIndex1(tabIndex1: number) {

    this.tabIndex1Source.next(tabIndex1);
  }

  setTabIndex2(tabIndex2: number) {

    this.tabIndex2Source.next(tabIndex2);
  }

  setTabIndex3(tabIndex3: number) {
    this.tabIndex3Source.next(tabIndex3);
  }

  setTabIndex4(tabIndex4: number) {

    this.tabIndex4Source.next(tabIndex4);
  }
  setTabIndex5(tabIndex5: number) {

    this.tabIndex5Source.next(tabIndex5);
  }
  setTabIndex6(tabIndex6: number) {

    this.tabIndex6Source.next(tabIndex6);
  }


  showTab001(tab001: boolean) {

    this.tab001Source.next(tab001);
  }

  showTab002(tab002: boolean) {
    this.tab002Source.next(tab002);
  }

  showTab003(tab003: boolean) {
    console.log('set tab003 ' +  tab003);
    this.tab003Source.next(tab003);
  }

  showTab004(tab004: boolean) {
    console.log('set tab004 ' +  tab004);
    this.tab004Source.next(tab004);
  }

  showTab005(tab005: boolean) {
    console.log('set tab005 ' +  tab005);
    this.tab005Source.next(tab005);
  }

  showTab006(tab006: boolean) {
    console.log('set tab006 ' +  tab006);
    this.tab006Source.next(tab006);
  }
  showTab007(tab007: boolean) {
    console.log('set tab007 ' +  tab007);
    this.tab007Source.next(tab007);
  }

  showTab008(tab008: boolean) {
    console.log('set tab008 ' +  tab008);
    this.tab008Source.next(tab008);
  }

}
