import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from '../abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../../core';

@Component({
  selector: 'balance-withdraw',
  template: require('./balance-withdraw.html'),
  styles: [require('./balance-withdraw.css')],
})
export class BalanceWithdrawComponent extends AbstractWalletComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    moneyService: MoneyService,
    localWalletService: LocalWalletService) {
    super(route, router, moneyService, localWalletService);
  }

}
