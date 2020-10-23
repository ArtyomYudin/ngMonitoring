import { Component, OnInit, Input } from '@angular/core';
// mport { WebsocketService } from '@services/websocket.service';
// import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';
import { LocalStorageService } from '@services/localstorage.service.';
import { SensorModel } from '@models/sensor.model';
import { ServerRoomAccessModel } from '@models/server-room-access.model';

// import { Event } from '@services/websocket.service.event';

declare let streamCamRoom1: any;

/*
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
*/
@Component({
  selector: 'app-server-room-1',
  templateUrl: './server-room-1.component.html',
  styleUrls: ['./server-room-1.component.scss'],
})
export class ServerRoom1Component implements OnInit {
  // public sensorValueArray$: Observable<IEvent>;

  // public serverRoomEmployeeArray$: Observable<IServerRoomEmployeeEvent>;

  @Input() sensorValueArray$: SensorModel;

  @Input() serverRoomEmployeeArray1$: ServerRoomAccessModel;

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    // private wsService: WebsocketService,
    public storage: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.loadScripts();
    // this.sensorValueArray$ = this.wsService.on<IEvent>(Event.EV_SERVER_ROOM_SENSOR);
    // this.serverRoomEmployeeArray$ = this.wsService.on<IServerRoomEmployeeEvent>(Event.EV_SERVER_ROOM_1_EMPLOYEE);
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
