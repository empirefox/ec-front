import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletResolver } from '../core';

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

export const routes: Routes = [
  {
    path: 'wallet',
    component: WalletRouteComponent,
    resolve: {
      wallet: WalletResolver,
    },
    children: [
      {
        path: '', // wallet
        component: WalletComponent,
      },
      {
        path: 'balance',
        component: BalanceComponent,
        children: [
          {
            path: 'cash',
            component: BalanceCashComponent,
          },
          {
            path: 'frozen',
            component: BalanceFrozenComponent,
          },
          {
            path: 'withdraw',
            component: BalanceWithdrawComponent,
          }
        ]
      },
      {
        path: 'points',
        component: PointsComponent,
      },
      {
        path: 'reward',
        component: RewardComponent,
      },
    ]
  },
];

export const walletRouting: ModuleWithProviders = RouterModule.forChild(routes);
