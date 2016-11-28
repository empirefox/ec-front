import { Component } from '@angular/core';
import { IUserCashFrozen, LocalWalletBase } from '../../core';

@Component({
  selector: 'balance-frozen',
  templateUrl: './balance-frozen.html',
  styleUrls: ['./balance-frozen.css'],
})
export class BalanceFrozenComponent {
  items: IUserCashFrozen[];

  constructor(public base: LocalWalletBase) { }

  ngOnInit() {
    this.items = this.base.wallet.Frozen;
  }

}
