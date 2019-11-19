import { TestBed } from '@angular/core/testing';

import { TaskmanagerService } from './taskmanager.service';

describe('TaskmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskmanagerService = TestBed.get(TaskmanagerService);
    expect(service).toBeTruthy();
  });
});
