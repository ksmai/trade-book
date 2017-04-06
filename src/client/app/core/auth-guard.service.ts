import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const hasLoggedIn$ = this.authService.isLoggedIn();
    const isLogin = /login/.test(state.url);

    return hasLoggedIn$
      .map(hasLoggedIn => {
        if (isLogin && hasLoggedIn) {
          this.router.navigate(['/setting']);

          return false;
        } else if (!isLogin && !hasLoggedIn) {
          this.router.navigate(['/login']);

          return false;
        }

        return true;
      });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}

