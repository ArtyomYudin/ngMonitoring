import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { VPNModel } from '@models/vpn.model';

export class AccountFilter implements ClrDatagridStringFilterInterface<VPNModel> {
  accepts(user: VPNModel, search: string): boolean {
    return user.account.toLowerCase().indexOf(search) >= 0;
  }
}
