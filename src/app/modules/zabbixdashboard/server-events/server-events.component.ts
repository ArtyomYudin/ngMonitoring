import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '@services/localstorage.service.';
import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-server-events',
  templateUrl: './server-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './server-events.component.scss'],
})
export class ServerEventsComponent implements OnInit {
  @Input() eventServerArray$: EventModel;

  constructor(public storage: LocalStorageService) {}

  isEmpty(): boolean {
    return !!(typeof this.eventServerArray$ === 'undefined' || this.eventServerArray$.length === 0);
  }

  ngOnInit(): void {}
}
