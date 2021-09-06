import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from '@app/services/websocket.service';

import { DHCPLeaseModel } from '@models/dhcp-lease.model';
import { Event } from '@services/websocket.service.event';

import { DhcpIpFilter } from '@modules/dhcpdashboard/dhcpdashboard.filter.class';

@Component({
  selector: 'app-dhcp-leases',
  templateUrl: './dhcp-leases.component.html',
  styleUrls: ['./dhcp-leases.component.scss'],
})
export class DhcpLeasesComponent implements OnInit {
  public eventDHCPLeasesArray$: any | Observable<DHCPLeaseModel>;

  public ipFilter = new DhcpIpFilter();

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventDHCPLeasesArray$ = this.wsService.on<DHCPLeaseModel>(Event.EV_DHCP_LEASES);
  }
}
