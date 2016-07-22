import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWalletComponent } from '../abstract-wallet.component';

@Component({
  selector: 'balance-refill',
  template: require('./balance-refill.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceRefillComponent extends AbstractWalletComponent { }
