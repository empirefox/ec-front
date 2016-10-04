import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { walletRouting } from './routes';

import { WalletRouteComponent } from './wallet-route.component';
import { WalletComponent } from './wallet.component';
import {
  BalanceComponent,
  BalanceCashComponent,
  BalanceFrozenComponent,
  BalanceWithdrawComponent,
} from './balance';
import { PointsComponent } from './points';
import { RewardComponent } from './reward';

@NgModule({
  declarations: [
    WalletRouteComponent,
    WalletComponent,
    BalanceComponent,
    BalanceCashComponent,
    BalanceFrozenComponent,
    BalanceWithdrawComponent,
    PointsComponent,
    RewardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    walletRouting,
  ],
  exports: [
    WalletRouteComponent,
    WalletComponent,
    BalanceComponent,
    BalanceCashComponent,
    BalanceFrozenComponent,
    BalanceWithdrawComponent,
    PointsComponent,
    RewardComponent,
  ],
})
export class WalletModule { }
