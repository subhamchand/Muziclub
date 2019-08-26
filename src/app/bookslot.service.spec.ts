import { TestBed } from '@angular/core/testing';

import { BookslotService } from './bookslot.service';

describe('BookslotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookslotService = TestBed.get(BookslotService);
    expect(service).toBeTruthy();
  });
});
