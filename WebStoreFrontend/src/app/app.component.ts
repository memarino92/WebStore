import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import {
  ServiceProxy,
  IWeatherForecast,
} from '../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceProxy],
})
export class AppComponent implements OnInit {
  forecasts?: IWeatherForecast[]

  constructor(private weatherService: ServiceProxy) {}
  ngOnInit(): void {
    this.getForecasts()
  }
  getForecasts() {
    this.weatherService.getWeatherForecast().subscribe((result) => {
      this.forecasts = result.flatMap((i) => [i, i, i, i, i, i, i, i, i, i])
    })
  }
}
