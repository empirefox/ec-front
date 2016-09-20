import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { OrderRouteComponent } from './order-route.component';
import { OrderListComponent } from './order-list';
import { OrderDetailPageComponent } from './order-detail';
import { OrderEvalComponent } from './eval';
import { DeliveryPageComponent } from './delivery';

export const routes: Routes = [
  {
    path: 'order',
    component: OrderRouteComponent,
    children: [
      {
        path: 'list',
        component: OrderListComponent
      },
      {
        path: 'eval/:id',
        component: OrderEvalComponent,
      },
      {
        path: 'detail/:id',
        component: OrderDetailPageComponent,
      },
      {
        path: 'delivery/:id',
        component: DeliveryPageComponent,
      }
    ]
  },
];

export const orderRouting: ModuleWithProviders = RouterModule.forChild(routes);
