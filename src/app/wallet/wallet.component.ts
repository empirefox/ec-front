import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from './abstract-wallet.component';
import { IWallet, MoneyService, LocalWalletBase } from '../core';

@Component({
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css'],
})
export class WalletComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public base: LocalWalletBase) { }

  gotoBalance() { this.router.navigateByUrl('/wallet/balance'); }
  gotoPoints() { this.router.navigateByUrl('/wallet/points'); }
  gotoReward() { this.router.navigateByUrl('/wallet/reward'); }
}
