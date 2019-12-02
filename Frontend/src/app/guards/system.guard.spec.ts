import { TestBed, async, inject } from '@angular/core/testing';

import { SystemGuard } from './system.guard';

describe('SystemGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemGuard]
    });
  });

  it('should ...', inject([SystemGuard], (guard: SystemGuard) => {
    expect(guard).toBeTruthy();
  }));
});
