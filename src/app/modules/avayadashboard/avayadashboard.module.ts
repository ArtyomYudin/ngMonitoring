import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AvayaCDRComponent } from '@app/modules/avayadashboard/avaya-cdr/avaya-cdr.component';
import { AvayaDashboardComponent } from '@modules/avayadashboard/avayadashboard.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: AvayaDashboardComponent,
  },
]);

@NgModule({
  declarations: [AvayaDashboardComponent, AvayaCDRComponent],
  imports: [CommonModule, ClarityModule, routing],
})
export class AvayaDashboardModule {}
