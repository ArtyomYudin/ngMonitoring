import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';

import { Event } from '@services/websocket.service.event';

declare let streamCamRoom2: any;

export interface IEvent {
  temper1: string;
  temper2: string;
  himidity1: string;
  himidity2: string;
}

export interface IServerRoomEmployeeEvent {
  lname: string;
  fname: string;
  mname: string;
  photo: ArrayBuffer;
  apoint: string;
  tstamp: string;
  apointaddr: string;
}

@Component({
  selector: 'app-server-room-2',
  templateUrl: './server-room-2.component.html',
  styleUrls: ['./server-room-2.component.scss'],
})
export class ServerRoom2Component implements OnInit {
  public sensorValueArray$: Observable<IEvent>;

  public serverRoomEmployeeArray$: Observable<IServerRoomEmployeeEvent>;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private wsService: WebsocketService) {}

  public ngOnInit(): void {
    this.loadScripts();
    this.sensorValueArray$ = this.wsService.on<IEvent>(Event.EV_SERVER_ROOM_SENSOR);
    this.serverRoomEmployeeArray$ = this.wsService.on<IServerRoomEmployeeEvent>(Event.EV_SERVER_ROOM_2_EMPLOYEE);
  }

  private loadScripts() {
    this.dynamicScriptLoader
      .load('jsmpeg', 'videocanvas')
      .then(() => {
        // Script Loaded Successfully
        streamCamRoom2();
      })
      .catch(error => console.log(error));
  }
}
