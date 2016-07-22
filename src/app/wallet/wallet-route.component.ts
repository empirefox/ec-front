import { Component } from '@angular/core';
import { IWallet, MoneyService, LocalWalletService } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [LocalWalletService],
})
export class WalletRouteComponent {

  constructor(
    private moneyService: MoneyService,
    private localWalletService: LocalWalletService) { }

  ngOnInit() {
    this.localWalletService.src$.subscribe();
    this.moneyService.getWallet().subscribe(wallet => this.localWalletService.publish(wallet));
  }

}
