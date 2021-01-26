import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from '@app/services/websocket.service';

import { VPNUserModel } from '@models/vpn-user.model';
import { Event } from '@services/websocket.service.event';

import { AccountFilter } from '@modules/vpndashboard/vpndashboard.filter.class';

@Component({
  selector: 'app-vpn-users',
  templateUrl: './vpn-users.component.html',
  styleUrls: ['./vpn-users.component.scss'],
})
export class VpnUsersComponent implements OnInit {
  public eventVPNAllUsersArray$: Observable<VPNUserModel>;

  public eventVPNUserStatusArray$: Observable<number>;

  public accountFilter = new AccountFilter();

  constructor(private wsService: WebsocketService) {}

  public ngOnInit(): void {
    this.eventVPNAllUsersArray$ = this.wsService.on<VPNUserModel>(Event.EV_VPN_ALL_USERS);
    this.eventVPNUserStatusArray$ = this.wsService.on<number>(Event.EV_VPN_USER_STATUS);
  }

  public onDetailOpen(account: string): void {
    if (account !== null) this.wsService.send('get-vpn-user-info', account);
  }
}
