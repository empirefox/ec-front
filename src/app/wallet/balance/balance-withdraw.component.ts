import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWalletComponent } from '../abstract-wallet.component';

@Component({
  selector: 'balance-withdraw',
  template: require('./balance-withdraw.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceWithdrawComponent extends AbstractWalletComponent { }
