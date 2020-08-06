import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '@services/localstorage.service.';
import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-switch-events',
  templateUrl: './switch-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './switch-events.component.scss'],
})
export class SwitchEventsComponent implements OnInit {
  @Input() eventSwitchArray$: EventModel;

  constructor(public storage: LocalStorageService) {}

  isEmpty(): boolean {
    return !!(typeof this.eventSwitchArray$ === 'undefined' || this.eventSwitchArray$.length === 0);
  }

  ngOnInit(): void {}
}
