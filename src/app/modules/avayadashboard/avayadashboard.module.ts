import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalPipeModule } from '@pipe/globalpipe.module';
import { AvayaCDRComponent } from '@app/modules/avayadashboard/avaya-cdr/avaya-cdr.component';
import { AvayaDashboardComponent } from '@modules/avayadashboard/avayadashboard.component';
import { AvayaCDRFilterComponent } from './avaya-cdr-filter/avaya-cdr-filter.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: AvayaDashboardComponent,
  },
]);

@NgModule({
  declarations: [AvayaDashboardComponent, AvayaCDRComponent, AvayaCDRFilterComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, GlobalPipeModule, routing],
})
export class AvayaDashboardModule {}
