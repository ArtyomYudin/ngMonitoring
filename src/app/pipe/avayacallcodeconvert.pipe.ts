import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avayaCallCodeConvert',
})
export class AvayaCallCodeConvertPipe implements PipeTransform {
  public transform(value: string, number: string): string {
    let codeDescript: string = value;
    switch (value) {
      case '0':
        codeDescript = 'Внутренний звонок';
        break;
      case '7':
        if (/^8812/.test(number)) codeDescript = 'Исходящий городской';
        if (/^[1-7][0-9]{6}/.test(number)) codeDescript = 'Исходящий городской';
        if (/^8(9\d{9})$/.test(number)) codeDescript = 'Исходящий мобильный';
        if (/^8800/.test(number)) codeDescript = 'Исходящий бесплатный на 800';
        //codeDescript = /^8800/.test(number) ? 'Исходящий бесплатный на 800' : value;
        break;
      case '9':
        codeDescript = 'Входящий звонок';
        break;
      case 'E':
        codeDescript = 'Неправильный вызов';
        break;
      default:
        codeDescript = value;
        break;
    }
    return codeDescript;
  }
}
