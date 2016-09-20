import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.userService.isLoggedIn()) { return true; }

    return this.userService.mustUpdateToken().map(_ => true).catch((err, caught) => Observable.of(false));
  }
}
