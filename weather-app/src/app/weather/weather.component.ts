import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiOpenWeatherService } from "../api-open-weather.service";
import {ChartConfiguration, ChartOptions} from "chart.js";

export interface MeteoElement {
  name: string;
  country: string;
  temp: string;
  humidity: string;
}
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  displayedColumns: string[] = ['name', 'country', 'temp', 'humidity'];
  datas!: MeteoElement[] ;
  dataSource: any[] = [];
  tempMoy: number = 0;
  moyen: number=0;
  tempET: number = 0;
  credit = null;

  constructor(private formBuilder: FormBuilder, private apiOpenWeather: ApiOpenWeatherService) {
   }

  ngOnInit(): void {
    this.datas = [];
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
  }

  mapperOpenWeather(data: any){
    console.log('test undified');
    console.log(data);
    return {name: data.name,country: data.sys.country, temp: data.main.temp, humidity: data.main.humidity};
  }

  mapperPrevision(data: any){
    return {name: data.city_info.name,country: data.city_info.country, temp: data.current_condition.tmp,humidity: data.current_condition.humidity};
  }

  // mapperWeatherApi(data: any){
  //   return {name: data.location.name,country: data.location.country, temp: data.current.temp_c, humidity: data.current.humidity}
  // }

  mapperWeatherApi(data: any){
    return {name: data.location.name,country: data.location.country, temp: data.current.temperature, humidity: data.current.humidity}
  }

  sendApi(formValues: { location: any }) {
    this.tempMoy = 0;
    this.datas = [];
    this.apiOpenWeather.getWeather(formValues.location).subscribe((response: any) => {
        console.log(response);
        console.log(response.dataOpenWeather);
        this.datas.push(this.mapperOpenWeather(response.dataOpenWeather));
        this.datas.push(this.mapperPrevision(response.dataPrevisionMeteo));
        this.credit = response.dataCredit.solde;
        this.datas.push(this.mapperWeatherApi(response.dataWeatherApi));
        this.moyen = (this.mapperOpenWeather(response.dataOpenWeather).temp + this.mapperPrevision(response.dataPrevisionMeteo).temp + this.mapperWeatherApi(response.dataWeatherApi).temp )/ 3;
        this.tempET += Math.abs(this.mapperOpenWeather(response.dataOpenWeather).temp - this.moyen);
        this.tempET += Math.abs(this.mapperPrevision(response.dataPrevisionMeteo).temp - this.moyen);
        this.tempET += Math.abs(this.mapperWeatherApi(response.dataWeatherApi).temp - this.moyen);
        this.tempET = Math.sqrt(this.tempET/ 3);
        this.tempMoy =this.moyen;
        console.log("tempMoyen = ", this.tempMoy);
        // End Christian code
        console.log(this.datas);
        this.dataSource = this.datas;
        console.log(this.dataSource);

      this.lineChartData =  {
        labels: ['1','2','3','4','5','6','7','8','9','10','12','13','14','15','16','17','18','19','20'],
        datasets: [
          {
            data: response.timeOpenWeather ,
            label: 'OpenWeather',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            //backgroundColor: 'rgba(255,0,0,0.3)'
          },
          {
            data: response.timePrevisionMeteo,
            label: 'PrevisionMeteo',
            fill: true,
            tension: 0.5,
            borderColor: 'bleu',
            //backgroundColor: 'rgba(256,0,0,1)'
          },
          {
            data: response.timeWeatherApi,
            label: 'WeatherStack',
            fill: true,
            tension: 0.5,
            borderColor: 'orange',
            //backgroundColor: 'rgba(256,0,0,1)'
          },
          {
            data: response.moyenneTime,
            label: 'Moyenne de temps',
            fill: true,
            tension: 0.5,
            borderColor: 'green',
            //backgroundColor: 'rgba(256,0,0,1)'
          }
        ]
      };

      this.barChartData = {
        labels: ['1','2','3','4','5','6','7','8','9','10','12','13','14','15','16','17','18','19','20'],
        datasets: [
          { data: response.timeOpenWeather , label: 'OpenWeather'},
          { data: response.timePrevisionMeteo, label: 'PrevisionMeteo'},
          { data: response.timeWeatherApi, label: 'WeatherStack'},
          { data: response.moyenneTime, label: 'Moyenne de temps'},
        ]
      };
      });
  }

  /*********************************** Graph code    *********************************************/

    // title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] | undefined ;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data']| undefined ;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  /**************************************** End Graph code ******************************************/

}
