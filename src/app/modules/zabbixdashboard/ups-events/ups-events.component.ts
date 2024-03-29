import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '@services/localstorage.service.';
import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-ups-events',
  templateUrl: './ups-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './ups-events.component.scss'],
})
export class UpsEventsComponent implements OnInit {
  @Input() eventUPSArray$: any | EventModel;

  constructor(public storage: LocalStorageService) {}

  isEmpty(): boolean {
    return !!(typeof this.eventUPSArray$ === 'undefined' || this.eventUPSArray$.length === 0);
  }

  ngOnInit(): void {}
}
