import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-avaya-cdr-filter',
  templateUrl: './avaya-cdr-filter.component.html',
  styleUrls: ['./avaya-cdr-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaCDRFilterComponent implements OnInit, OnDestroy {
  // @Input() filtered: boolean;
  @Output() addFilter = new EventEmitter<object>();
  public avayaCDRFilters!: FormGroup;
  private ngUnsubscribe$: Subject<any> = new Subject();
  private filterFlag: boolean = false;
  private loadGridFlag: boolean = false;
  private exportFlag: boolean = false;
  constructor(private formBuilder: FormBuilder, private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.avayaCDRFilters = this.formBuilder.group(
      {
        callingDateStart: ['', [Validators.pattern('^[0-9]{2}[.][0-9]{2}[.][0-9]{4}$')]],
        callingDateEnd: ['', [Validators.pattern('^[0-9]{2}[.][0-9]{2}[.][0-9]{4}$')]],
        callNumber: ['', [Validators.pattern('^[0-9]*$')]],
        callName: [''],
        callDirectionIn: [''],
        callDirectionOut: [''],
      },
      { validator: this.dateValidator },
    );
    this.f.callDirectionIn.disable();
    this.f.callDirectionOut.disable();
    this.f.callNumber.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      value ? this.f.callDirectionIn.enable() : this.f.callDirectionIn.disable();
      value ? this.f.callDirectionOut.enable() : this.f.callDirectionOut.disable();
      value ? this.f.callName.disable() : this.f.callName.enable();
    });
    this.f.callName.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      value ? this.f.callDirectionIn.enable() : this.f.callDirectionIn.disable();
      value ? this.f.callDirectionOut.enable() : this.f.callDirectionOut.disable();
      value ? this.f.callNumber.disable() : this.f.callNumber.enable();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  get f() {
    return this.avayaCDRFilters.controls;
  }

  public onSubmit(flag?: string) {
    if (!this.avayaCDRFilters.valid) return false;
    this.exportFlag = false;
    const filter = {
      dateStart: this.f.callingDateStart.value ? this.f.callingDateStart.value.split('.').reverse().join('-') : null,
      dateEnd: this.f.callingDateEnd.value ? this.f.callingDateEnd.value.split('.').reverse().join('-') : null,
      callNumber: this.f.callNumber.value,
      callName: this.f.callName.value,
      callDirectionIn: this.f.callDirectionIn.value,
      callDirectionOut: this.f.callDirectionOut.value,
    };
    if (flag === 'export') {
      this.exportFlag = true;
    } else {
      this.filterFlag = true;
      this.loadGridFlag = true;
    }
    this.wsService.send('get-filtered-avaya-cdr', filter);
    this.addFilter.emit({ filter: this.filterFlag, loadGrid: this.loadGridFlag, export: this.exportFlag });
  }

  public onCancel(): void {
    this.avayaCDRFilters.reset();
    this.filterFlag = false;
    this.loadGridFlag = true;
    this.exportFlag = false;
    this.addFilter.emit({ ilter: this.filterFlag, loadGrid: this.loadGridFlag, export: this.exportFlag });
  }

  private dateValidator(group: FormGroup) {
    const startDate =
      group.controls.callingDateStart.value !== '' ? group.controls.callingDateStart.value : new Date().toLocaleDateString();
    const endDate = group.controls.callingDateEnd.value !== '' ? group.controls.callingDateEnd.value : new Date().toLocaleDateString();
    return startDate > endDate ? { invalidDate: true } : null;
  }
}
