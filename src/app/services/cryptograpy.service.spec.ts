import { TestBed } from '@angular/core/testing';

import { CryptograpyService } from './cryptograpy.service';

describe('CryptograpyService', () => {
  let service: CryptograpyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptograpyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
