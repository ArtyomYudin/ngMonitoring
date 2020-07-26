import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { ZabbixDashboardComponent } from './zabbixdashboard.component';
import { ServerRoom1Component } from './server-room-1/server-room-1.component';
import { ServerRoom2Component } from './server-room-2/server-room-2.component';
import { ProviderInfoComponent } from './provider-info/provider-info.component';
import { UpsEventsComponent } from './ups-events/ups-events.component';
import { SwitchEventsComponent } from './switch-events/switch-events.component';
import { RouterEventsComponent } from './router-events/router-events.component';
import { VmwareEventsComponent } from './vmware-events/vmware-events.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: ZabbixDashboardComponent,
  },
]);

@NgModule({
  declarations: [ZabbixDashboardComponent, ServerRoom1Component, ServerRoom2Component, ProviderInfoComponent, UpsEventsComponent, SwitchEventsComponent, RouterEventsComponent, VmwareEventsComponent],
  imports: [CommonModule, ClarityModule, routing],
})
export class ZabbixDashboardModule {}
