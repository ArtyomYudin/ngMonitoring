import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { GlobalPipeModule } from '@pipe/globalpipe.module';

import { VPNDashboardComponent } from '@modules/vpndashboard/vpndashboard.component';
import { WebsocketService } from '@services/websocket.service';
import { VpnUsersComponent } from '@modules/vpndashboard/vpn-users/vpn-users.component';
import { VpnConnectedComponent } from '@modules/vpndashboard/vpn-connected/vpn-connected.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: VPNDashboardComponent,
  },
]);
@NgModule({
  declarations: [VPNDashboardComponent, VpnUsersComponent, VpnConnectedComponent],
  imports: [CommonModule, ClarityModule, GlobalPipeModule, routing],
  providers: [WebsocketService],
})
export class VPNDashboardModule {}
