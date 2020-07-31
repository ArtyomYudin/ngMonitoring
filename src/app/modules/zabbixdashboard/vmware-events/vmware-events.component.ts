import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

import { Event } from '@services/websocket.service.event';

import { EventModel } from '@models/event.model';
@Component({
  selector: 'app-vmware-events',
  templateUrl: './vmware-events.component.html',
  styleUrls: ['./vmware-events.component.scss'],
})
export class VmwareEventsComponent implements OnInit {
  public eventVMWareArray$: Observable<EventModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventVMWareArray$ = this.wsService.on<EventModel>(Event.EV_VMWARE_VALUE);
  }
}
