import {TestBed, inject} from '@angular/core/testing';

import {SchedulerTaskService} from './scheduler-task.service';

describe('SchedulerTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerTaskService]
    });
  });

  it('should be created', inject([SchedulerTaskService], (service: SchedulerTaskService) => {
    expect(service).toBeTruthy();
  }));
});
