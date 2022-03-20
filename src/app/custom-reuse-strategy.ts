import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  constructor() {}

  public shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[route.data.key] = handle;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[route.data.key] && !!route.component;
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.component) return null;
    return this.handlers[route.data.key];
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
