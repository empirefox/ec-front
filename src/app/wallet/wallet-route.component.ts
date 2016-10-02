import { Component, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IWallet, MoneyService, LocalWalletBase } from '../core';

const provideParent = (component: any, parentType?: any) => {
  return { provide: parentType || LocalWalletBase, useExisting: forwardRef(() => component) };
};

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [provideParent(WalletRouteComponent)],
})
export class WalletRouteComponent implements LocalWalletBase {
  wallet: IWallet;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let data = <{ wallet: IWallet }>this.route.snapshot.data;
    this.wallet = data.wallet;
  }

}
