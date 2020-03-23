import { TestBed } from '@angular/core/testing';

import { Crm.DataService } from './crm.data.service';

describe('Crm.DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Crm.DataService = TestBed.get(Crm.DataService);
    expect(service).toBeTruthy();
  });
});
