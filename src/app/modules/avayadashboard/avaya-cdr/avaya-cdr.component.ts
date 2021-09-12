import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { WebsocketService } from '@app/services/websocket.service';
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AvayaCDRModel } from '@models/avaya-cdr.model';
import { Event } from '@services/websocket.service.event';
import { ExcelService } from '@services/exporttoexcel.service';

@Component({
  selector: 'app-avaya-cdr',
  templateUrl: './avaya-cdr.component.html',
  styleUrls: ['./avaya-cdr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaCDRComponent implements OnInit, OnChanges, OnDestroy {
  @Input() addFilter: { filter: boolean; loadGrid: boolean; export: boolean };
  private ngUnsubscribe$: Subject<any> = new Subject();
  public eventAvayaCDRArray$: AvayaCDRModel | any;
  public eventAvayaCDRFilteredArray$: AvayaCDRModel | any;
  public cdrGridData$: AvayaCDRModel | any;
  public loading: boolean = true;
  public createExcel$: Observable<boolean>;
  public createExcelSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public descSort = ClrDatagridSortOrder.DESC;

  constructor(private wsService: WebsocketService, private excelService: ExcelService) {
    this.createExcel$ = this.createExcelSubject$.asObservable();
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
    // this.filteredDataSubject$ = new BehaviorSubject<AvayaCDRModel>(this.eventAvayaCDRFilteredArray$);
    this.cdrGridData$ = this.eventAvayaCDRArray$;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.addFilter.currentValue.export) {
      this.loading = changes.addFilter.currentValue.loadGrid;
      this.cdrGridData$ = changes.addFilter.currentValue.filter ? this.eventAvayaCDRFilteredArray$ : this.eventAvayaCDRArray$;
      !changes.addFilter.currentValue.filter ? this.wsService.send('avaya-cdr-reset-filter', true) : null;
    } else {
      this.createExcelSubject$.next(true);
      this.eventAvayaCDRFilteredArray$.pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe$), take(1)).subscribe(data => {
        this.exportToExcel(data);
      });
    }
  }
  ngOnDestroy(): void {
    this.createExcelSubject$.next(null);
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private exportToExcel(data): void {
    this.excelService.exportAsExcelFile(data, 'avaya_call_log');
    this.createExcelSubject$.next(false);
  }
}
