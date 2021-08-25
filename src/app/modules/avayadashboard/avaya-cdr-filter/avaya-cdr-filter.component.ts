import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-avaya-cdr-filter',
  templateUrl: './avaya-cdr-filter.component.html',
  styleUrls: ['./avaya-cdr-filter.component.scss'],
})
export class AvayaCDRFilterComponent implements OnInit {
  sessionDatePick: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
