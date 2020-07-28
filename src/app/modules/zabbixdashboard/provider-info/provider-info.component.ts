import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

export interface IEvent {
  inSpeedOrange: number;
  outSpeedOrange: number;
  inSpeedTelros: number;
  outSpeedTelros: number;
  inSpeedFilanco: number;
  outSpeedFilanco: number;
  bgp62: number;
  bgp176: number;
}

@Component({
  selector: 'app-provider-info',
  templateUrl: './provider-info.component.html',
  styleUrls: ['./provider-info.component.scss'],
})
export class ProviderInfoComponent implements OnInit {
  public providerValueArray$: Observable<IEvent>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.providerValueArray$ = this.wsService.on<IEvent>(Event.EV_PROVIDER_VALUE);
  }
}
