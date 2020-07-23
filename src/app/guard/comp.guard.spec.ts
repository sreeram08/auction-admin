import { TestBed, async, inject } from '@angular/core/testing';

import { CompGuard } from './comp.guard';

describe('CompGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompGuard]
    });
  });

  it('should ...', inject([CompGuard], (guard: CompGuard) => {
    expect(guard).toBeTruthy();
  }));
});
