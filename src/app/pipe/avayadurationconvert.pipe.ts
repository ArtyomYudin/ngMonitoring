import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avayaDurationConvert',
})
export class AvayaDurationConvertPipe implements PipeTransform {
  public transform(value: number): string {
    if (value < 60) {
      return value + ' сек.';
    } else {
      return Math.floor(value / 60) + ' мин. ' + (value % 60) + ' сек.';
    }
  }
}
