import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Header1Component } from '../header-bar';
import { AbstractWalletComponent } from './abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../core';

@Component({
  template: require('./wallet.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Header1Component],
})
export class WalletComponent extends AbstractWalletComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    moneyService: MoneyService,
    localWalletService: LocalWalletService) {
    super(route, router, moneyService, localWalletService);
  }

  onViewBalance() { this.router.navigate(['../ballance'], { relativeTo: this.route }); }

  onViewPoints() { this.router.navigate(['../points'], { relativeTo: this.route }); }
}
