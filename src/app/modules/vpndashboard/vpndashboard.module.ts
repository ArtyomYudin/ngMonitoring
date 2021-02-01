import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  imports: [CommonModule, ClarityModule, FormsModule, ReactiveFormsModule, GlobalPipeModule, routing],
  providers: [DatePipe, WebsocketService],
})
export class VPNDashboardModule {}
