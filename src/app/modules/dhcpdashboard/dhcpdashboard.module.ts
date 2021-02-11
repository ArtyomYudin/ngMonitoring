import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { DhcpDashboardComponent } from '@modules/dhcpdashboard/dhcpdashboard.component';

import { WebsocketService } from '@services/websocket.service';
import { DhcpLeasesComponent } from './dhcp-leases/dhcp-leases.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: DhcpDashboardComponent,
  },
]);

@NgModule({
  declarations: [DhcpDashboardComponent, DhcpLeasesComponent],
  imports: [CommonModule, ClarityModule, routing],
  providers: [WebsocketService],
})
export class DhcpDashboardModule {}
