import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '@services/localstorage.service.';
import { EventModel } from '@models/event.model';

@Component({
  selector: 'app-vmware-events',
  templateUrl: './vmware-events.component.html',
  styleUrls: ['./../zabbixdashboard.component.scss', './vmware-events.component.scss'],
})
export class VmwareEventsComponent implements OnInit {
  @Input() eventVMWareArray$: EventModel;

  constructor(public storage: LocalStorageService) {}

  ngOnInit(): void {}
}
