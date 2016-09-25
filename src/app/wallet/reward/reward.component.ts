import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IWallet, MoneyService, LocalWalletService } from '../../core';

@Component({
  template: require('./reward.html'),
  styles: [require('./reward.css')],
})
export class RewardComponent {

  wallet: IWallet;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moneyService: MoneyService,
    private localWalletService: LocalWalletService) { }

  ngOnInit() {
    this.sub = this.localWalletService.src$.subscribe(wallet => this.wallet = wallet);
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
