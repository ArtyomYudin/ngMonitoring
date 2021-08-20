import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@app/services/websocket.service';
import { Observable } from 'rxjs';

import { AvayaCDRModel } from '@models/avaya-cdr.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-avaya-cdr',
  templateUrl: './avaya-cdr.component.html',
  styleUrls: ['./avaya-cdr.component.scss'],
})
export class AvayaCDRComponent implements OnInit {
  public eventAvayaCDRArray$: Observable<AvayaCDRModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventAvayaCDRArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_CURRENT_DAY);
  }
}
