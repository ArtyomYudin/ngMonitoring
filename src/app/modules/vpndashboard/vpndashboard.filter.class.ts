import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { VPNUserModel } from '@app/models/vpn-user.model';

export class AccountFilter implements ClrDatagridStringFilterInterface<VPNUserModel> {
  accepts(user: VPNUserModel, search: string): boolean {
    return user.lastName.toLowerCase().indexOf(search) >= 0;
  }
}
