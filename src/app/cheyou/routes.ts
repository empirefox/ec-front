import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CheyouHubComponent } from './cheyou-hub.component';
import { CheyouDetailComponent } from './cheyou-detail.component';
import { CheyouBuyComponent } from './cheyou-buy.component';
import { CheyouListComponent } from './cheyou-list.component';
import { CheyouMyComponent } from './cheyou-my.component';

export const routes: Routes = [
  {
    path: 'cheyou',
    component: CheyouHubComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CheyouListComponent,
      },
      {
        path: 'buy',
        component: CheyouBuyComponent,
      },
      {
        path: 'my',
        component: CheyouMyComponent,
      },
      {
        path: 'detail/:id',
        component: CheyouDetailComponent,
      },
    ]
  }
];

export const cheyouRouting: ModuleWithProviders = RouterModule.forChild(routes);
