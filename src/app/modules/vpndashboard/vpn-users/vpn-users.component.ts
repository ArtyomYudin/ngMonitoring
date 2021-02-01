import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { WebsocketService } from '@app/services/websocket.service';

import { VPNUserModel } from '@models/vpn-user.model';
import { VPNSessionModel } from '@models/vpn-session.model';
import { Event } from '@services/websocket.service.event';

import { AccountFilter } from '@modules/vpndashboard/vpndashboard.filter.class';

@Component({
  selector: 'app-vpn-users',
  templateUrl: './vpn-users.component.html',
  styleUrls: ['./vpn-users.component.scss'],
})
export class VpnUsersComponent implements OnInit {
  public eventVPNAllUsersArray$: Observable<VPNUserModel>;

  public eventVPNUserStatusArray$: Observable<string>;

  public eventVPNUserSessionsArray$: Observable<VPNSessionModel>;

  public accountFilter = new AccountFilter();

  sessionDatePick: FormGroup;

  constructor(private datePipe: DatePipe, private wsService: WebsocketService) {}

  public ngOnInit(): void {
    this.eventVPNAllUsersArray$ = this.wsService.on<VPNUserModel>(Event.EV_VPN_ALL_USERS);
    this.eventVPNUserStatusArray$ = this.wsService.on<string>(Event.EV_VPN_USER_STATUS);
    // this.eventVPNUserSessionsArray$ = this.wsService.on<VPNSessionModel>(Event.EV_VPN_USER_SESSIONS);
    this.eventVPNUserSessionsArray$ = this.wsService.on<VPNSessionModel>(Event.EV_VPN_USER_SESSION_FOR_DATE);
  }

  public onDetailOpen(account: string): void {
    this.sessionDatePick = new FormGroup({
      defaultDate: new FormControl(new Date().toLocaleDateString()),
    });
    if (account !== null) {
      this.wsService.send('get-vpn-user-info', { sessionDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'), vpnAccount: account });
    }
  }

  public setVPNSessionDate(event: Date, account: string): void {
    this.wsService.send('get-vpn-user-session', { sessionDate: this.datePipe.transform(event, 'yyyy-MM-dd'), vpnAccount: account });
  }
}
