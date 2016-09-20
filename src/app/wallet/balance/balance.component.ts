import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from '../abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../../core';

@Component({
  template: require('./balance.html'),
  styles: [require('./balance.css')],
})
export class BalanceComponent extends AbstractWalletComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    moneyService: MoneyService,
    localWalletService: LocalWalletService) {
    super(route, router, moneyService, localWalletService);
  }

}
