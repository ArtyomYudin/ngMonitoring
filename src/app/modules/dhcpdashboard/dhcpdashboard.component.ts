import { Component, OnInit } from '@angular/core';
import { loadCoreIconSet, loadTechnologyIconSet } from '@cds/core/icon';

@Component({
  selector: 'app-dhcpdashboard',
  templateUrl: './dhcpdashboard.component.html',
  styleUrls: ['./dhcpdashboard.component.scss'],
})
export class DhcpDashboardComponent implements OnInit {
  constructor() {
    loadCoreIconSet();
    loadTechnologyIconSet();
  }

  ngOnInit(): void {}
}
