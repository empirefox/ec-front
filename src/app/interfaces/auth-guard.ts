import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.tokenService.isLoggedIn()) { return true; }

    return this.tokenService.mustUpdateToken().map(_ => true).catch((err, caught) => Observable.of(false));
  }
}
