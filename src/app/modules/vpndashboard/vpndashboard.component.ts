import { Component, OnInit } from '@angular/core';
import { loadCoreIconSet, loadTechnologyIconSet } from '@cds/core/icon';

@Component({
  selector: 'app-vpndashboard',
  templateUrl: './vpndashboard.component.html',
  styleUrls: ['./vpndashboard.component.scss'],
})
export class VPNDashboardComponent implements OnInit {
  constructor() {
    loadCoreIconSet();
    loadTechnologyIconSet();
  }

  public ngOnInit() {}
}
