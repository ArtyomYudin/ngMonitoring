import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dhcpAddressState',
})
export class DhcpAddressStatePipe implements PipeTransform {
  public transform(value: any): any {
    switch (value) {
      case 'Active': {
        return 'Активный';
      }
      case 'ActiveReservation': {
        return 'Активный и зарезервирован';
        break;
      }
      case 'InactiveReservation': {
        return 'Не активный и зарезервирован';
        break;
      }
      default: {
        return null;
        break;
      }
    }
  }
}
