import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

import { EventModel } from '@models/event.model';
@Component({
  selector: 'app-switch-events',
  templateUrl: './switch-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './switch-events.component.scss'],
})
export class SwitchEventsComponent implements OnInit {
  public eventSwitchArray$: Observable<EventModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventSwitchArray$ = this.wsService.on<EventModel>(Event.EV_SWITCH_VALUE);
  }
}
