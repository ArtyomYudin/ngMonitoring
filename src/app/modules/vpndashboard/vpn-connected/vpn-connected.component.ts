import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from '@app/services/websocket.service';

import { VPNSessionModel } from '@models/vpn-session.model';
import { Event } from '@services/websocket.service.event';

import { AccountFilter } from '@modules/vpndashboard/vpndashboard.filter.class';

@Component({
  selector: 'app-vpn-connected',
  templateUrl: './vpn-connected.component.html',
  styleUrls: ['./vpn-connected.component.scss'],
})
export class VpnConnectedComponent implements OnInit {
  public eventVPNOnlineArray$: Observable<VPNSessionModel>;

  public accountFilter = new AccountFilter();

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventVPNOnlineArray$ = this.wsService.on<VPNSessionModel>(Event.EV_VPN_ONLINE);
  }
}
