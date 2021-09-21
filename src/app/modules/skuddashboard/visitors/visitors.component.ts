import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebsocketService } from '@services/websocket.service';
import { Event } from '@services/websocket.service.event';
import { IGuestCarModel } from '@models/guest-car.model';
import { Subject } from 'rxjs';

export interface IMessage {
  // event: string;
  value: string;
}

export interface IRealOnTerritiry {
  empReal: number;
  guestReal: number;
}

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent implements OnInit {
  private ngUnsubscribe$: Subject<any> = new Subject();
  public employeePerDay$: Observable<number>;
  public guestPerDay$: Observable<number>;
  public carPerDay$: Observable<number>;
  public realOnTerritoryAC$: Observable<IRealOnTerritiry>;
  public realOnTerritoryAS$: Observable<IRealOnTerritiry>;
  public realCarOnTerritory$: Observable<IGuestCarModel>;
  public today = new Date().toLocaleDateString();
  public carPhotoOpen = false;
  public carPhotoLink: string;

  constructor(private wsService: WebsocketService) {}

  public ngOnInit() {
    // get messages
    this.employeePerDay$ = this.wsService.on<number>(Event.EV_EMPLOYEE_PER_DAY);
    this.guestPerDay$ = this.wsService.on<number>(Event.EV_GUEST_PER_DAY);
    this.carPerDay$ = this.wsService.on<number>(Event.EV_CAR_PER_DAY);
    this.realOnTerritoryAC$ = this.wsService.on<IRealOnTerritiry>(Event.EV_REAL_ON_TERRITORY_AC);
    this.realOnTerritoryAS$ = this.wsService.on<IRealOnTerritiry>(Event.EV_REAL_ON_TERRITORY_AS);
    this.realCarOnTerritory$ = this.wsService.on<IGuestCarModel>(Event.EV_REAL_CAR_ON_TERRITORY);
  }
  public onCarPhoto(link: string) {
    this.carPhotoLink = link;
    this.carPhotoOpen = true;
  }
}
