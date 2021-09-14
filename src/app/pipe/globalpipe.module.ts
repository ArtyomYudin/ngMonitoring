import { NgModule } from '@angular/core';
import { Blobtobase64Pipe } from '@pipe/blobtobase64.pipe';
import { DatetimeformatPipe } from '@pipe/datetimeformat.pipe';
import { DhcpAddressStatePipe } from '@pipe/dhcpaddressstate.pipe';
import { AvayaDurationConvertPipe } from '@pipe/avayadurationconvert.pipe';
import { AvayaCallCodeConvertPipe } from '@pipe/avayacallcodeconvert.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [Blobtobase64Pipe, DatetimeformatPipe, DhcpAddressStatePipe, AvayaDurationConvertPipe, AvayaCallCodeConvertPipe],
  exports: [Blobtobase64Pipe, DatetimeformatPipe, DhcpAddressStatePipe, AvayaDurationConvertPipe, AvayaCallCodeConvertPipe],
})
export class GlobalPipeModule {}
