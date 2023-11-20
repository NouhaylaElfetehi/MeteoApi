import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPrevisionMeteoService {

  constructor(private http: HttpClient) {}

  getWeather(location: string){
      return this.http.get(
          'https://www.prevision-meteo.ch/services/json/' + location
      );
  }
}
