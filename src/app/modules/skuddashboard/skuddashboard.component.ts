import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, share, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WebsocketService } from '@app/services/websocket.service';

@Component({
  selector: 'app-skuddashboard',
  templateUrl: './skuddashboard.component.html',
  styleUrls: ['./skuddashboard.component.scss'],
})
export class SkudDashboardComponent implements OnInit, OnDestroy {
  public initDashboard = false;

  public isConnected: boolean;

  private ngUnsubscribe$: Subject<any> = new Subject();

  constructor(private wsService: WebsocketService) {
    this.wsService.status.pipe(share(), distinctUntilChanged(), takeUntil(this.ngUnsubscribe$)).subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  public ngOnInit() {
    this.initDashboard = true;
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
