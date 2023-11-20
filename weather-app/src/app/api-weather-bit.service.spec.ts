import { TestBed } from '@angular/core/testing';

import { ApiWeatherBitService } from './api-weather-bit.service';

describe('ApiWeatherBitService', () => {
  let service: ApiWeatherBitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWeatherBitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
