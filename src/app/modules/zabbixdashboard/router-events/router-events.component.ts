import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from '@services/localstorage.service.';

import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-router-events',
  templateUrl: './router-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './router-events.component.scss'],
})
export class RouterEventsComponent implements OnInit {
  @Input() eventRouterArray$: any | EventModel;

  constructor(public storage: LocalStorageService) {}

  isEmpty(): boolean {
    return !!(typeof this.eventRouterArray$ === 'undefined' || this.eventRouterArray$.length === 0);
  }

  ngOnInit(): void {}
}
