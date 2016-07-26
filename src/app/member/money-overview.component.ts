import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoneyService, LocalWalletService } from '../core';
import { WalletComponent } from '../wallet';

@Component({
  selector: 'money-overview',
  template: require('./money-overview.html'),
  styles: [require('./money-overview.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['wallet'],
})
export class MoneyOverviewComponent extends WalletComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    moneyService: MoneyService,
    localWalletService: LocalWalletService) {
    super(route, router, moneyService, localWalletService);
  }

  onGotoWallet() { this.router.navigate(['/wallet']); }

  onViewBalance() { this.router.navigate(['/wallet/ballance']); }

  onViewPoints() { this.router.navigate(['/wallet/points']); }

}
