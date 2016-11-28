import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideParent, IWallet, LocalWalletBase } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [provideParent(WalletRouteComponent, LocalWalletBase)],
})
export class WalletRouteComponent implements LocalWalletBase {
  wallet: IWallet;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let data = <{ wallet: IWallet }>this.route.snapshot.data;
    this.wallet = data.wallet;
  }

}
