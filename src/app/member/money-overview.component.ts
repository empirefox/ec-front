import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IWallet } from '../core';
import { WalletComponent } from '../wallet';

@Component({
  selector: 'money-overview',
  templateUrl: './money-overview.html',
  styleUrls: ['./money-overview.css'],
})
export class MoneyOverviewComponent {

  @Input() wallet: IWallet;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  onGotoWallet() { this.router.navigateByUrl('/wallet'); }

  onViewBalance() { this.router.navigateByUrl('/wallet/balance'); }

  onViewPoints() { this.router.navigateByUrl('/wallet/points'); }

  gotoReward() { this.router.navigateByUrl('/wallet/reward'); }

}
