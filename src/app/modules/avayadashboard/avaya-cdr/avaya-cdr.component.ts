import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { WebsocketService } from '@app/services/websocket.service';
import { BehaviorSubject, distinctUntilChanged, last, Observable, share, Subject, takeUntil, tap } from 'rxjs';
import { ClrDatagridSortOrder } from '@clr/angular';
import { AvayaCDRModel } from '@models/avaya-cdr.model';
import { Event } from '@services/websocket.service.event';

@Component({
  selector: 'app-avaya-cdr',
  templateUrl: './avaya-cdr.component.html',
  styleUrls: ['./avaya-cdr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaCDRComponent implements OnInit, OnChanges, OnDestroy {
  @Input() addFilter: { filter?: boolean; loadGrid?: boolean; export?: boolean };
  // @Input() loadGrid: boolean;
  private ngUnsubscribe$: Subject<any> = new Subject();
  public eventAvayaCDRArray$: AvayaCDRModel | any;
  public eventAvayaCDRFilteredArray$: AvayaCDRModel | any;
  public cdrGridData$: AvayaCDRModel | any;
  public exportData$: AvayaCDRModel | any;
  public loading: boolean = true;
  public descSort = ClrDatagridSortOrder.DESC;

  constructor(private wsService: WebsocketService) {
    this.eventAvayaCDRArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_CURRENT_DAY).pipe(
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe$),
      tap(() => {
        this.loading = false;
      }),
    );
    this.eventAvayaCDRFilteredArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_FILTERED).pipe(
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe$),
      tap(() => {
        this.loading = false;
      }),
    );
  }
  ngOnInit(): void {
    //this.loading = true;
    //this.eventAvayaCDRArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_CURRENT_DAY);
    // this.eventAvayaCDRFilteredArray$ = this.wsService.on<AvayaCDRModel>(Event.EV_AVAYA_CDR_FILTERED);
    this.cdrGridData$ = this.eventAvayaCDRArray$;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.loading = changes.addFilter.currentValue.loadGrid;
    this.exportData$ = changes.addFilter.currentValue.export ? this.eventAvayaCDRFilteredArray$ : null;
    this.cdrGridData$ = changes.addFilter.currentValue.filter ? this.eventAvayaCDRFilteredArray$ : this.eventAvayaCDRArray$;
    !changes.addFilter.currentValue.filter && !changes.addFilter.currentValue.export
      ? this.wsService.send('avaya-cdr-reset-filter', true)
      : null;
    changes.addFilter.currentValue.export ? this.exportToExcel(this.exportData$) : null;
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private exportToExcel(exportData): void {
    const mySubject = new BehaviorSubject(exportData);
    console.log('!!!!');
    mySubject.pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe$)).subscribe(data => console.log(data));
    //this.excelService.exportAsExcelFile(this.data, 'sample');
  }
}
