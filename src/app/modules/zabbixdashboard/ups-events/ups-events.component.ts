import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

export interface IEvent {
  upsName: string;
  upsDescription: string;
  upsTimeStamp: string;
  upsEventName: string;
}

@Component({
  selector: 'app-ups-events',
  templateUrl: './ups-events.component.html',
  styleUrls: ['./ups-events.component.scss'],
})
export class UpsEventsComponent implements OnInit {
  public upsValueArray$: Observable<IEvent>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.upsValueArray$ = this.wsService.on<IEvent>(Event.EV_UPS_VALUE);
  }
}
