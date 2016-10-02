import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserCash, MoneyService, LocalWalletBase } from '../../core';

@Component({
  selector: 'balance-cash',
  template: require('./balance-cash.html'),
  styles: [require('./balance-cash.css')],
})
export class BalanceCashComponent {
  items: IUserCash[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

  ngOnInit() {
    this.items = this.base.wallet.Cashes;
  }

}
