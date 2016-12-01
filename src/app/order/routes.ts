import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderResolver, ProfileResolver, StoreResolver } from '../core';
import { OrderListComponent } from './order-list';
import { OrderDetailComponent } from './order-detail';
import { OrderEvalComponent } from './eval';
import { DeliveryPageComponent } from './delivery';

export const routes: Routes = [
  {
    path: 'order',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: OrderListComponent,
      },
      {
        path: 'eval/:id',
        component: OrderEvalComponent,
        resolve: {
          order: OrderResolver,
        },
      },
      {
        path: 'detail/:id',
        component: OrderDetailComponent,
        resolve: {
          profile: ProfileResolver,
          order: OrderResolver,
          stores: StoreResolver,
        },
      },
      {
        path: 'delivery/:id',
        component: DeliveryPageComponent,
        resolve: {
          order: OrderResolver,
        },
      }
    ]
  },
];

export const orderRouting: ModuleWithProviders = RouterModule.forChild(routes);
