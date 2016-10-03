import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IWallet } from './money';
import { MoneyService } from './money.service';

@Injectable()
export class WalletResolver implements Resolve<IWallet> {

  constructor(
    private router: Router,
    private moneyService: MoneyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IWallet> {
    return this.moneyService.getWallet();
  }

}
