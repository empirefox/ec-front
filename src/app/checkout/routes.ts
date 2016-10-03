import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ProfileResolver, AddressResolver } from '../core';
import { CheckoutItemsResolver } from './checkout.resolver';
import { CheckoutRouteComponent } from './checkout-route.component';
import { CheckoutContentComponent } from './content';
import { CheckoutAddrsComponent } from './address-selector';
import { CheckoutAddrCreatorComponent } from './address-creator';
import { InvoicePageComponent } from './invoice';

export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutRouteComponent,
    resolve: {
      profile: ProfileResolver,
      items: CheckoutItemsResolver,
      address: AddressResolver,
    },
    children: [
      {
        path: '', // content
        component: CheckoutContentComponent
      },
      {
        path: 'address-selector',
        component: CheckoutAddrsComponent,
      },
      {
        path: 'address-creator',
        component: CheckoutAddrCreatorComponent,
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
      }
    ]
  }
];

export const checkoutRouting: ModuleWithProviders = RouterModule.forChild(routes);
