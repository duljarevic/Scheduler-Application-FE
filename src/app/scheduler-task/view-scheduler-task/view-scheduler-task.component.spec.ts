import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchedulerTaskComponent } from './view-scheduler-task.component';

describe('ViewBillsComponent', () => {
  let component: ViewSchedulerTaskComponent;
  let fixture: ComponentFixture<ViewSchedulerTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSchedulerTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchedulerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
