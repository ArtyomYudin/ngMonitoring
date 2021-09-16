import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { loadCoreIconSet, loadTechnologyIconSet } from '@cds/core/icon';

@Component({
  selector: 'app-avayadashboard',
  templateUrl: './avayadashboard.component.html',
  styleUrls: ['./avayadashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvayaDashboardComponent implements OnInit {
  public filtered: { filter: boolean; loadGrid: boolean; export: boolean } = { filter: false, loadGrid: true, export: false };

  constructor() {
    loadCoreIconSet();
    loadTechnologyIconSet();
  }

  ngOnInit(): void {}

  getFilteredEvent(data) {
    this.filtered = data;
  }
}
