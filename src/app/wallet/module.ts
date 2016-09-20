import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderBarModule } from '../header-bar';
import { walletRouting } from './routes';

import { WalletRouteComponent } from './wallet-route.component';
import { WalletComponent } from './wallet.component';
import {
  BalanceComponent,
  BalanceDepositComponent,
  BalanceRefillComponent,
  BalanceWithdrawComponent,
} from './balance';
import { PointsComponent } from './points';
import { RewardComponent } from './reward';

@NgModule({
  declarations: [
    WalletRouteComponent,
    WalletComponent,
    BalanceComponent,
    BalanceDepositComponent,
    BalanceRefillComponent,
    BalanceWithdrawComponent,
    PointsComponent,
    RewardComponent,
  ],
  imports: [
    CommonModule,
    HeaderBarModule,
    walletRouting,
  ],
  exports: [
    WalletRouteComponent,
    WalletComponent,
    BalanceComponent,
    BalanceDepositComponent,
    BalanceRefillComponent,
    BalanceWithdrawComponent,
    PointsComponent,
    RewardComponent,
  ],
})
export class WalletModule { }
