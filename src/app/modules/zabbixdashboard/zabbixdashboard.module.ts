import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { ZabbixDashboardComponent } from './zabbixdashboard.component';
import { ServerRoom1Component } from './server-room-1/server-room-1.component';
import { ServerRoom2Component } from './server-room-2/server-room-2.component';
import { ProviderInfoComponent } from './provider-info/provider-info.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: ZabbixDashboardComponent,
  },
]);

@NgModule({
  declarations: [ZabbixDashboardComponent, ServerRoom1Component, ServerRoom2Component, ProviderInfoComponent],
  imports: [CommonModule, ClarityModule, routing],
})
export class ZabbixDashboardModule {}
