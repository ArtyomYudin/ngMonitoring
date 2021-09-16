import { Component, OnInit } from '@angular/core';
import { loadCoreIconSet, loadTechnologyIconSet } from '@cds/core/icon';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor() {
    loadCoreIconSet();
    loadTechnologyIconSet();
  }

  public ngOnInit() {}
}
