import { TestBed } from '@angular/core/testing';

import { ApiOpenWeatherService } from './api-open-weather.service';

describe('ApiOpenWeatherService', () => {
  let service: ApiOpenWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOpenWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
