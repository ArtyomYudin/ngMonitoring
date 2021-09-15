import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalPipeModule } from '@pipe/globalpipe.module';
import { AvayaCDRComponent } from '@app/modules/avayadashboard/avaya-cdr/avaya-cdr.component';
import { AvayaDashboardComponent } from '@modules/avayadashboard/avayadashboard.component';
import { AvayaCDRFilterComponent } from './avaya-cdr-filter/avaya-cdr-filter.component';
import { AvayaCallCodeConvertPipe } from '@app/pipe/avayacallcodeconvert.pipe';
import { AvayaDurationConvertPipe } from '@app/pipe/avayadurationconvert.pipe';
import { ExcelService } from '@services/exporttoexcel.service';

const routing = RouterModule.forChild([
  {
    path: '',
    component: AvayaDashboardComponent,
  },
]);

@NgModule({
  declarations: [AvayaDashboardComponent, AvayaCDRComponent, AvayaCDRFilterComponent, AvayaCallCodeConvertPipe, AvayaDurationConvertPipe],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, GlobalPipeModule, routing],
  providers: [AvayaDurationConvertPipe, AvayaCallCodeConvertPipe, ExcelService],
})
export class AvayaDashboardModule {}
