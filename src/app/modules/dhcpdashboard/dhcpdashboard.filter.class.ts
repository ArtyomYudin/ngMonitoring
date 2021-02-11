import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { DHCPLeaseModel } from '@app/models/dhcp-lease.model';

export class DhcpIpFilter implements ClrDatagridStringFilterInterface<DHCPLeaseModel> {
  accepts(lease: DHCPLeaseModel, search: string): boolean {
    return lease.ipAddress.toLowerCase().indexOf(search) >= 0;
  }
}
