import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../core';

@Injectable()
export class PhoneRequiredGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.tokenService.getUserinfo().map(info => {
      if (!info.Phone) {
        this.router.navigateByUrl('/safe/phone');
      }
      return !!info.Phone;
    });
  }
}
