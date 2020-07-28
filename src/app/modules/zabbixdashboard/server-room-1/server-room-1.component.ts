import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';

import { Event } from '@services/websocket.service.event';

declare let streamCamRoom1: any;

export interface IEvent {
  temper1: string;
  temper2: string;
  himidity1: string;
  himidity2: string;
}

@Component({
  selector: 'app-server-room-1',
  templateUrl: './server-room-1.component.html',
  styleUrls: ['./server-room-1.component.scss'],
})
export class ServerRoom1Component implements OnInit {
  public sensorValueArray$: Observable<IEvent>;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private wsService: WebsocketService) {}

  public ngOnInit(): void {
    this.loadScripts();
    this.sensorValueArray$ = this.wsService.on<IEvent>(Event.EV_SERVER_ROOM_SENSOR);
  }

  private loadScripts() {
    this.dynamicScriptLoader
      .load('jsmpeg', 'videocanvas')
      .then(() => {
        // Script Loaded Successfully
        streamCamRoom1();
      })
      .catch(error => console.log(error));
  }
}
