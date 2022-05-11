import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/internal/operators/map';
import { map } from 'rxjs/operators';
import { ChartModel } from '@models/chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  public getChartData(chartId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
    };

    return this.http
      .post<ChartModel>('https://it.center-inform.ru:3000/api/charts', { chartId }, httpOptions)
      .pipe(map(chartsData => chartsData));
  }
}
