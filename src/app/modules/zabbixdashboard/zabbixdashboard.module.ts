import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { GlobalPipeModule } from '@pipe/globalpipe.module';

import { ZabbixDashboardComponent } from '@modules/zabbixdashboard/zabbixdashboard.component';
import { ServerRoom1Component } from '@modules/zabbixdashboard/server-room-1/server-room-1.component';
import { ServerRoom2Component } from '@modules/zabbixdashboard/server-room-2/server-room-2.component';
import { ProviderInfoComponent } from '@modules/zabbixdashboard/provider-info/provider-info.component';
import { UpsEventsComponent } from '@modules/zabbixdashboard/ups-events/ups-events.component';
import { SwitchEventsComponent } from '@modules/zabbixdashboard/switch-events/switch-events.component';
import { RouterEventsComponent } from '@modules/zabbixdashboard/router-events/router-events.component';
import { VmwareEventsComponent } from '@modules/zabbixdashboard/vmware-events/vmware-events.component';

import { WebsocketService } from '@services/websocket.service';
import { LocalStorageService } from '@services/localstorage.service.';
import { ServerEventsComponent } from './server-events/server-events.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: ZabbixDashboardComponent,
  },
]);

@NgModule({
  declarations: [
    ZabbixDashboardComponent,
    ServerRoom1Component,
    ServerRoom2Component,
    ProviderInfoComponent,
    UpsEventsComponent,
    SwitchEventsComponent,
    RouterEventsComponent,
    VmwareEventsComponent,
    ServerEventsComponent,
  ],
  imports: [CommonModule, ClarityModule, MatExpansionModule, DragDropModule, GlobalPipeModule, routing],
  providers: [WebsocketService, LocalStorageService],
})
export class ZabbixDashboardModule {}
