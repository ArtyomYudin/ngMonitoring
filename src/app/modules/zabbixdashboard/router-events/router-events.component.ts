import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-router-events',
  templateUrl: './router-events.component.html',
  styleUrls: ['./router-events.component.scss'],
})
export class RouterEventsComponent implements OnInit {
  public eventRouterArray$: Observable<EventModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventRouterArray$ = this.wsService.on<EventModel>(Event.EV_ROUTER_VALUE);
  }
}
