import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyWalletComponent } from '../money';

@Component({
  selector: 'money-overview',
  template: require('./money-overview.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['wallet'],
})
export class MoneyOverviewComponent extends MoneyWalletComponent {

  onGotoWallet() { this.router.navigate(['/wallet']); }

  onViewBalance() { this.router.navigate(['/wallet/ballance']); }

  onViewPoints() { this.router.navigate(['/wallet/points']); }

}
