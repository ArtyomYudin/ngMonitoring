import { NgModule } from '@angular/core';
import { Blobtobase64Pipe } from '@pipe/blobtobase64.pipe';
import { DatetimeformatPipe } from '@pipe/datetimeformat.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [Blobtobase64Pipe, DatetimeformatPipe],
  exports: [Blobtobase64Pipe, DatetimeformatPipe],
})
export class GlobalPipeModule {}
