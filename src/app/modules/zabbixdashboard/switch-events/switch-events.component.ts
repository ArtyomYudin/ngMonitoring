import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

export interface IEvent {
  switchName: string;
  switchDescription: string;
  switchTimeStamp: string;
  switchEventName: string;
}

@Component({
  selector: 'app-switch-events',
  templateUrl: './switch-events.component.html',
  styleUrls: ['./switch-events.component.scss'],
})
export class SwitchEventsComponent implements OnInit {
  public switchValueArray$: Observable<IEvent>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.switchValueArray$ = this.wsService.on<IEvent>(Event.EV_SWITCH_VALUE);
  }
}
