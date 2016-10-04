import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserCash, MoneyService, LocalWalletBase } from '../../core';

@Component({
  selector: 'balance-cash',
  templateUrl: './balance-cash.html',
  styleUrls: ['./balance-cash.css'],
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
