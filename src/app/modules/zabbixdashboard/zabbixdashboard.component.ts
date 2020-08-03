import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { LocalStorageService } from '@services/localstorage.service.';

@Component({
  selector: 'app-zabbixdashboard',
  templateUrl: './zabbixdashboard.component.html',
  styleUrls: ['./zabbixdashboard.component.scss'],
})
export class ZabbixDashboardComponent implements OnInit {
  leftPanel = ['ups', 'vmware'];

  rightPanel = ['switch', 'router'];

  constructor(public storage: LocalStorageService) {}

  @ViewChild('ups') ups: TemplateRef<any>;

  @ViewChild('vmware') vmware: TemplateRef<any>;

  @ViewChild('switch') switch: TemplateRef<any>;

  @ViewChild('router') router: TemplateRef<any>;

  onDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    // this.leftPanel = this.storage.getItem('leftPanel');
  }

  ngOnInit(): void {
    // this.leftPanel = this.storage.getItem('leftPanel');
  }
}
