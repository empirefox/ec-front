import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from '../abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../../core';

@Component({
  selector: 'balance-deposit',
  template: require('./balance-deposit.html'),
  styles: [require('./balance-deposit.css')],
})
export class BalanceDepositComponent extends AbstractWalletComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    moneyService: MoneyService,
    localWalletService: LocalWalletService) {
    super(route, router, moneyService, localWalletService);
  }

}
