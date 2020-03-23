import { TestBed } from '@angular/core/testing';

import { CssService } from './css.service';

describe('CssService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CssService = TestBed.get(CssService);
    expect(service).toBeTruthy();
  });
});
