import { TestBed } from '@angular/core/testing';

import { WidowService } from './widow.service';

describe('WidowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidowService = TestBed.get(WidowService);
    expect(service).toBeTruthy();
  });
});
