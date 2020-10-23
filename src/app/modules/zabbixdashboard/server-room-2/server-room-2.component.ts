import { Component, OnInit, Input } from '@angular/core';
// mport { WebsocketService } from '@services/websocket.service';
// import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';
import { LocalStorageService } from '@services/localstorage.service.';
import { SensorModel } from '@models/sensor.model';
import { ServerRoomAccessModel } from '@models/server-room-access.model';

// import { Event } from '@services/websocket.service.event';

declare let streamCamRoom2: any;

@Component({
  selector: 'app-server-room-2',
  templateUrl: './server-room-2.component.html',
  styleUrls: ['./server-room-2.component.scss'],
})
export class ServerRoom2Component implements OnInit {
  // public sensorValueArray$: Observable<IEvent>;

  // public serverRoomEmployeeArray$: Observable<IServerRoomEmployeeEvent>;

  @Input() sensorValueArray$: SensorModel;

  @Input() serverRoomEmployeeArray2$: ServerRoomAccessModel;

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
        streamCamRoom2();
      })
      .catch(error => console.log(error));
  }
}
