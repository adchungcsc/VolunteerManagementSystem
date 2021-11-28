import { TestBed } from '@angular/core/testing';

import { EventSignupsService } from './event-signups.service';

describe('EventSignupsService', () => {
  let service: EventSignupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSignupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
