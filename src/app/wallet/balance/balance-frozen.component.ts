import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserCashFrozen, MoneyService, LocalWalletBase } from '../../core';

@Component({
  selector: 'balance-frozen',
  templateUrl: './balance-frozen.html',
  styleUrls: ['./balance-frozen.css'],
})
export class BalanceFrozenComponent {
  items: IUserCashFrozen[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

  ngOnInit() {
    this.items = this.base.wallet.Frozen;
  }

}
