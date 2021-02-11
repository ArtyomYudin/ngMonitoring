import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from '@app/services/websocket.service';

import { DHCPInfoModel } from '@models/dhcp-info.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-dhcp-info',
  templateUrl: './dhcp-info.component.html',
  styleUrls: ['./dhcp-info.component.scss'],
})
export class DhcpInfoComponent implements OnInit {
  public eventDHCPInfoArray$: Observable<DHCPInfoModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventDHCPInfoArray$ = this.wsService.on<DHCPInfoModel>(Event.EV_DHCP_INFO);
  }
}
