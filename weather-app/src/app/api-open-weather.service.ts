import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root'
})
export class ApiOpenWeatherService {

  constructor(private http: HttpClient) {}

  getWeather(location: string){
    return this.http.get(`${baseUrl}?city=${location}&id=1`);
}
}
