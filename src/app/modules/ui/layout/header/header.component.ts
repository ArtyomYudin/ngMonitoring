import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

import { AuthenticationService } from '@services/auth.service';
// import { SessionCheckService } from './../../../auth/sessioncheck.service';
import { AuthUser } from '@models/authuser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  public currentUser: AuthUser;
  public clock = interval(1000).pipe(map(() => new Date()));

  private ngUnsubscribe$: any | Subject<any> = new Subject();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, // private sessionCheckService: SessionCheckService,
  ) {
    this.authenticationService.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(x => (this.currentUser = x));
    // this.sessionCheckService.isActivateStatus
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe(
    //       isExpired => {
    //         console.log('Resived !')
    //         isExpired ? null : this.onLogout()
    //       });
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  public onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public isAdmin() {
    // console.log(JSON.parse(this.currentUser.accessRole));
    return JSON.parse(this.currentUser.accessRole).admin === 1;
    // return true;
  }
}
