import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Header1Component } from '../header-bar';
import { AbstractWalletComponent } from './abstract-wallet.component';

@Component({
  template: require('./wallet.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Header1Component],
})
export class WalletComponent extends AbstractWalletComponent {

  onViewBalance() { this.router.navigate(['../ballance'], { relativeTo: this.route }); }

  onViewPoints() { this.router.navigate(['../points'], { relativeTo: this.route }); }
}
