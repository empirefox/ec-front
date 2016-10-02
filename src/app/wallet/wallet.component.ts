import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from './abstract-wallet.component';
import { IWallet, MoneyService, LocalWalletBase } from '../core';

@Component({
  template: require('./wallet.html'),
  styleUrls: ['./wallet.css'],
})
export class WalletComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

  gotoBalance() { this.router.navigate(['../balance'], { relativeTo: this.route }); }
  gotoPoints() { this.router.navigate(['../points'], { relativeTo: this.route }); }
  gotoReward() { this.router.navigate(['../reward'], { relativeTo: this.route }); }
}
