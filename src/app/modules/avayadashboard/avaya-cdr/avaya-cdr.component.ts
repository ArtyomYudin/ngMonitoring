import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebsocketService } from '@app/services/websocket.service';
import { Observable } from 'rxjs';

import { AvayaCDRModel } from '@models/avaya-cdr.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-avaya-cdr',
  templateUrl: './avaya-cdr.component.html',
  styleUrls: ['./avaya-cdr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaCDRComponent implements OnInit, OnChanges {
  @Input() addFilter: boolean;
  public eventAvayaCDRArray$: Observable<AvayaCDRModel>;
  public eventAvayaCDRFilteredArray$: Observable<AvayaCDRModel>;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.eventAvayaCDRArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_CURRENT_DAY);
    this.eventAvayaCDRFilteredArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_FILTERED);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.addFilter.currentValue);
    console.log(this.eventAvayaCDRArray$);
  }
}
