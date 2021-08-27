import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-avaya-cdr-filter',
  templateUrl: './avaya-cdr-filter.component.html',
  styleUrls: ['./avaya-cdr-filter.component.scss'],
})
export class AvayaCDRFilterComponent implements OnInit {
  public avayaCDRFilters!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

  public onSubmit() {}

  public onCancel(): void {
    this.avayaCDRFilters.reset();
  }
}
