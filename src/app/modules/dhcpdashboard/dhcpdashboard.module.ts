import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { DhcpDashboardComponent } from '@modules/dhcpdashboard/dhcpdashboard.component';

import { GlobalPipeModule } from '@pipe/globalpipe.module';

import { WebsocketService } from '@services/websocket.service';
import { DhcpLeasesComponent } from '@modules/dhcpdashboard/dhcp-leases/dhcp-leases.component';
import { DhcpInfoComponent } from '@modules/dhcpdashboard/dhcp-info/dhcp-info.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: DhcpDashboardComponent,
  },
]);

@NgModule({
  declarations: [DhcpDashboardComponent, DhcpLeasesComponent, DhcpInfoComponent],
  imports: [CommonModule, ClarityModule, GlobalPipeModule, routing],
  providers: [WebsocketService],
})
export class DhcpDashboardModule {}
