import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileResolver, AddressResolver } from '../core';

import { ProductRouteComponent } from './product-route.component';
import { ProductsPageComponent } from './products';
import { ProductPageComponent, ProductInfoComponent, ProductDetailComponent, ProductEvalComponent } from './product';
import { AddressSelectorPageComponent } from './address-selector';
import { AddressCreatorPageComponent } from './address-creator';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductRouteComponent,
    children: [
      {
        path: 'list',
        component: ProductsPageComponent,
      },
      {
        path: '1/:id',
        component: ProductPageComponent,
        resolve: {
          profile: ProfileResolver,
        },
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: ProductInfoComponent,
            resolve: {
              address: AddressResolver,
            },
          },
          {
            path: 'detail',
            component: ProductDetailComponent,
          },
          {
            path: 'eval',
            component: ProductEvalComponent,
          }
        ]
      },
      {
        path: 'addrs/:id',
        component: AddressSelectorPageComponent,
      },
      {
        path: 'addr-new/:id',
        component: AddressCreatorPageComponent,
      },
    ]
  },
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(routes);
