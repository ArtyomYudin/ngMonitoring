import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from '@services/localstorage.service.';

import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-router-events',
  templateUrl: './router-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './router-events.component.scss'],
})
export class RouterEventsComponent implements OnInit {
  @Input() eventRouterArray$: EventModel;

  constructor(public storage: LocalStorageService) {}

  ngOnInit(): void {}
}
