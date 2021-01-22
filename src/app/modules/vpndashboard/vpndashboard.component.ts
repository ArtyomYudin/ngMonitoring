import { Component, OnInit } from '@angular/core';
// import { takeUntil, share, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ClrDatagridSortOrder } from '@clr/angular';

import { WebsocketService } from '@app/services/websocket.service';

import { VPNModel } from '@models/vpn.model';
import { Event } from '@services/websocket.service.event';

import { AccountFilter } from '@modules/vpndashboard/vpndashboard.filter.class';

@Component({
  selector: 'app-vpndashboard',
  templateUrl: './vpndashboard.component.html',
  styleUrls: ['./vpndashboard.component.scss'],
})
export class VPNDashboardComponent implements OnInit {
  public descSort = ClrDatagridSortOrder.DESC;

  public eventVPNOnlineArray$: Observable<VPNModel>;

  public eventVPNSessionArray$: Observable<VPNModel>;

  public accountFilter = new AccountFilter();

  // private ngUnsubscribe$: Subject<any> = new Subject();

  // eventVPNOnlineArray$: VPNModel;

  // eventVPNSessionArray$: VPNModel;

  constructor(private wsService: WebsocketService) {}

  public ngOnInit(): void {
    this.eventVPNOnlineArray$ = this.wsService.on<VPNModel>(Event.EV_VPN_ONLINE);
    this.eventVPNSessionArray$ = this.wsService.on<VPNModel>(Event.EV_VPN_SESSION_PER_DAY);
  }
}
