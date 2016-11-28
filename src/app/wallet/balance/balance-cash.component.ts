import { Component } from '@angular/core';
import { IUserCash, LocalWalletBase } from '../../core';

@Component({
  selector: 'balance-cash',
  templateUrl: './balance-cash.html',
  styleUrls: ['./balance-cash.css'],
})
export class BalanceCashComponent {
  items: IUserCash[];

  constructor(public base: LocalWalletBase) { }

  ngOnInit() {
    this.items = this.base.wallet.Cashes;
  }

}
