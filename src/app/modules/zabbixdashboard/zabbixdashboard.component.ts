import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { takeUntil, share, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { loadCoreIconSet, loadTechnologyIconSet } from '@cds/core/icon';

import { WebsocketService } from '@app/services/websocket.service';
import { LocalStorageService } from '@services/localstorage.service.';

import { EventModel } from '@models/event.model';
import { SensorModel } from '@models/sensor.model';
import { ServerRoomAccessModel } from '@models/server-room-access.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-zabbixdashboard',
  templateUrl: './zabbixdashboard.component.html',
  styleUrls: ['./zabbixdashboard.component.scss'],
})
export class ZabbixDashboardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$: Subject<any> = new Subject();

  leftPanel = [];

  rightPanel = [];

  eventUPSArray$: EventModel;

  eventVMWareArray$: EventModel;

  eventSwitchArray$: EventModel;

  eventRouterArray$: EventModel;

  eventServerArray$: EventModel;

  sensorValueArray$: SensorModel;

  serverRoomEmployeeArray1$: ServerRoomAccessModel;

  serverRoomEmployeeArray2$: ServerRoomAccessModel;

  constructor(public storage: LocalStorageService, private wsService: WebsocketService) {
    loadCoreIconSet();
    loadTechnologyIconSet();
    this.wsService
      .on<EventModel>(Event.EV_UPS_VALUE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventUPSArray$ = data;
      });
    this.wsService
      .on<EventModel>(Event.EV_VMWARE_VALUE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventVMWareArray$ = data;
      });
    this.wsService
      .on<EventModel>(Event.EV_SWITCH_VALUE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventSwitchArray$ = data;
      });
    this.wsService
      .on<EventModel>(Event.EV_ROUTER_VALUE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventRouterArray$ = data;
      });
    this.wsService
      .on<EventModel>(Event.EV_SERVER_VALUE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventServerArray$ = data;
      });
    this.wsService
      .on<SensorModel>(Event.EV_SERVER_ROOM_SENSOR)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.sensorValueArray$ = data;
      });
    this.wsService
      .on<ServerRoomAccessModel>(Event.EV_SERVER_ROOM_1_EMPLOYEE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.serverRoomEmployeeArray1$ = data;
      });
    this.wsService
      .on<ServerRoomAccessModel>(Event.EV_SERVER_ROOM_2_EMPLOYEE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.serverRoomEmployeeArray2$ = data;
      });
  }

  @ViewChild('ups') ups: TemplateRef<any>;

  @ViewChild('vmware') vmware: TemplateRef<any>;

  @ViewChild('switch') switch: TemplateRef<any>;

  @ViewChild('router') router: TemplateRef<any>;

  @ViewChild('server') server: TemplateRef<any>;

  @ViewChild('serverroom1') serverroom1: TemplateRef<any>;

  @ViewChild('serverroom2') serverroom2: TemplateRef<any>;

  private saveDragDropState() {
    this.storage.setItem('monitoringLeftPanel', JSON.stringify(this.leftPanel));
    this.storage.setItem('monitoringRightPanel', JSON.stringify(this.rightPanel));
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // const panelName = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
      // this.wsService.send('drop-panel', panelName);
    }
    this.saveDragDropState();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.storage.getItem('monitoringLeftPanel') !== null) {
        this.leftPanel = JSON.parse(this.storage.getItem('monitoringLeftPanel'));
      } else {
        this.leftPanel = ['serverroom1', 'ups', 'vmware', 'server'];
      }
      if (this.storage.getItem('monitoringRightPanel') !== null) {
        this.rightPanel = JSON.parse(this.storage.getItem('monitoringRightPanel'));
      } else {
        this.rightPanel = ['serverroom2', 'switch', 'router'];
      }
    });
  }

  ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
