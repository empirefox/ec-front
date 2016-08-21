import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { MoneyService, IWallet } from '../core';
import { WalletComponent } from '../wallet';

@Component({
  selector: 'money-overview',
  template: require('./money-overview.html'),
  styles: [require('./money-overview.css')],
  inputs: ['wallet'],
})
export class MoneyOverviewComponent {

  wallet: IWallet;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moneyService: MoneyService) {
  }

  ngOnInit() {
    this.sub = this.moneyService.getWallet().subscribe(wallet => this.wallet = wallet);
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  onGotoWallet() { this.router.navigateByUrl('/wallet'); }

  onViewBalance() { this.router.navigateByUrl('/wallet/balance'); }

  onViewPoints() { this.router.navigateByUrl('/wallet/points'); }

}
