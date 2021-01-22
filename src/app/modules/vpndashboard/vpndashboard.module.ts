import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { GlobalPipeModule } from '@pipe/globalpipe.module';

import { VPNDashboardComponent } from '@modules/vpndashboard/vpndashboard.component';
import { WebsocketService } from '@services/websocket.service';

const routing = RouterModule.forChild([
  {
    path: '',
    component: VPNDashboardComponent,
  },
]);
@NgModule({
  declarations: [VPNDashboardComponent],
  imports: [CommonModule, ClarityModule, GlobalPipeModule, routing],
  providers: [WebsocketService],
})
export class VPNDashboardModule {}