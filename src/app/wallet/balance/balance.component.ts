import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Header1Component } from '../../header-bar';
import { AbstractWalletComponent } from '../abstract-wallet.component';

@Component({
  template: require('./balance.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Header1Component],
})
export class BalanceComponent extends AbstractWalletComponent { }
