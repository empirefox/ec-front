import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {
  ProductRouteComponent,
  ProductPageComponent,
  ProductInfoComponent,
  ProductDetailComponent,
  ProductEvalComponent,
  AddressSelectorPageComponent,
  AddressCreatorPageComponent
} from '../product';
import { SearchPageComponent } from '../search';
import { HomePageComponent } from './home-page.component';

// must sync with product
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: ProductRouteComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: '1/:id',
        component: ProductPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info', // info
            component: ProductInfoComponent
          },
          {
            path: 'detail',
            component: ProductDetailComponent
          },
          {
            path: 'eval',
            component: ProductEvalComponent
          }
        ]
      },
      {
        path: 'addrs',
        component: AddressSelectorPageComponent
      },
      {
        path: 'addr-creator',
        component: AddressCreatorPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      }
    ]
  },
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(routes);
