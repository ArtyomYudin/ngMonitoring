import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-avaya-cdr-filter',
  templateUrl: './avaya-cdr-filter.component.html',
  styleUrls: ['./avaya-cdr-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaCDRFilterComponent implements OnInit {
  // @Input() filtered: boolean;
  @Output() addFilter = new EventEmitter<boolean>();
  public avayaCDRFilters!: FormGroup;

  constructor(private formBuilder: FormBuilder, private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.avayaCDRFilters = this.formBuilder.group({
      callingDateStart: [''],
      callingDateEnd: [''],
      callNumber: [''],
      callName: [''],
      callDirectionIn: [''],
      callDirectionOut: [''],
    });
  }

  get f() {
    return this.avayaCDRFilters.controls;
  }

  public onSubmit() {
    const filter = {
      dateStart: this.f.callingDateStart.value,
      dateEnd: this.f.callingDateStart.value,
      callNumber: this.f.callNumber.value,
      callName: this.f.callName.value,
      callDirectionIn: this.f.callDirectionIn.value,
      callDirectionOut: this.f.callDirectionOut.value,
    };
    //this.wsService.send('get-filtered-avaya-cdr', filter);
    this.addFilter.emit(true);
  }

  public onCancel(): void {
    this.avayaCDRFilters.reset();
    this.addFilter.emit(false);
  }
}
