import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, share, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { WebsocketService } from '@app/services/websocket.service';

import { VPNModel } from '@models/vpn.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-vpndashboard',
  templateUrl: './vpndashboard.component.html',
  styleUrls: ['./vpndashboard.component.scss'],
})
export class VPNDashboardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$: Subject<any> = new Subject();

  eventVPNOnlineArray$: VPNModel;

  eventVPNSessionArray$: VPNModel;

  constructor(private wsService: WebsocketService) {
    this.wsService
      .on<VPNModel>(Event.EV_VPN_ONLINE)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventVPNOnlineArray$ = data;
      });

    this.wsService
      .on<VPNModel>(Event.EV_VPN_SESSION_PER_DAY)
      .pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.eventVPNSessionArray$ = data;
      });
  }

  ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
