import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherBitService {

  constructor(private http: HttpClient) {}

  getWeather(location: string){
      return this.http.get(
          // 'https://api.weatherbit.io/v2.0/current?city=' + location + '&country=fr&key=3beec8a1b4be4c11945f6a59155684a3'
        'https://api.weatherapi.com/v1/current.json?key=4769e416c3f94fb2904201449222009&q=' + location
      );
  }
}
