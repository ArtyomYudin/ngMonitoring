import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avayadashboard',
  templateUrl: './avayadashboard.component.html',
  styleUrls: ['./avayadashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaDashboardComponent implements OnInit {
  public filtered: boolean;

  constructor() {}

  ngOnInit(): void {}

  getFilteredEvent(data) {
    this.filtered = data;
  }
}
