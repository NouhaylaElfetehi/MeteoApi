import { TestBed } from '@angular/core/testing';

import { ApiPrevisionMeteoService } from './api-prevision-meteo.service';

describe('ApiPrevisionMeteoService', () => {
  let service: ApiPrevisionMeteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPrevisionMeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
