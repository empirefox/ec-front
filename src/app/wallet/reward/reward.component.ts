import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserCashRebate, IWallet, MoneyService, LocalWalletBase } from '../../core';

@Component({
  templateUrl: './reward.html',
  styleUrls: ['./reward.css'],
})
export class RewardComponent {
  rebates: IUserCashRebate[];
  unrebated: number;
  frozen: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moneyService: MoneyService,
    private base: LocalWalletBase) { }

  ngOnInit() {
    this.rebates = this.base.wallet.Rebates;
    this.unrebated = this.base.wallet.unrebated;
    this.frozen = this.base.wallet.frozen;
  }

  moneyClass(item: IUserCashRebate) {
    return ['money', item.Amount < 0 ? 'reduce' : 'add'];
  }

  moneyPre(item: IUserCashRebate) { return item.Amount > 0 ? '+' : ''; }

}
