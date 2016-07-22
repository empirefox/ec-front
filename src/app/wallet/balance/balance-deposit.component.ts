import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWalletComponent } from '../abstract-wallet.component';

@Component({
  selector: 'balance-deposit',
  template: require('./balance-deposit.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDepositComponent extends AbstractWalletComponent { }
