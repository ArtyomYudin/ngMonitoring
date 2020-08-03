import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';
import { LocalStorageService } from '@services/localstorage.service.';

import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-ups-events',
  templateUrl: './ups-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './ups-events.component.scss'],
})
export class UpsEventsComponent implements OnInit {
  public eventUPSArray$: Observable<EventModel>;

  constructor(private wsService: WebsocketService, public storage: LocalStorageService) {}

  ngOnInit(): void {
    this.eventUPSArray$ = this.wsService.on<EventModel>(Event.EV_UPS_VALUE);
  }
}
