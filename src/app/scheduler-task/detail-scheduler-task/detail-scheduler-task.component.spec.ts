import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSchedulerTaskComponent } from './detail-scheduler-task.component';

describe('DetailSchedulerTaskComponent', () => {
  let component: DetailSchedulerTaskComponent;
  let fixture: ComponentFixture<DetailSchedulerTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSchedulerTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSchedulerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
