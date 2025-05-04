import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PublicacionService } from './publicacion.service';

describe('PublicacionService', () => {
  let service: PublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicacionService]
    });
    service = TestBed.inject(PublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
