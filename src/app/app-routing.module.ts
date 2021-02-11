import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@services/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/skud', pathMatch: 'full' },
  {
    path: 'skud',
    loadChildren: () => import('./modules/skuddashboard/skuddashboard.module').then(m => m.SkudDashboardModule),
    canActivate: [AuthGuard],
    data: { key: 'cached_skud' },
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./modules/zabbixdashboard/zabbixdashboard.module').then(m => m.ZabbixDashboardModule),
    canActivate: [AuthGuard],
    data: { key: 'cached_monitoring' },
  },
  {
    path: 'vpn',
    loadChildren: () => import('./modules/vpndashboard/vpndashboard.module').then(m => m.VPNDashboardModule),
    canActivate: [AuthGuard],
    data: { key: 'cached_vpn' },
  },
  {
    path: 'dhcp',
    loadChildren: () => import('./modules/dhcpdashboard/dhcpdashboard.module').then(m => m.DhcpDashboardModule),
    canActivate: [AuthGuard],
    data: { key: 'cached_dhcp' },
  },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  {
    path: 'config',
    loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
