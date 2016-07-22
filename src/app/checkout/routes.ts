import { RouterConfig } from '@angular/router';
import { CheckoutItemsResolver } from '../app.resolver';
import { CheckoutRouteComponent } from './checkout-route.component';
import { CheckoutContentComponent } from './content';
import { AddressSelectorPageComponent as CheckoutAddrsComponent } from './address-selector';
import { AddressCreatorPageComponent as CheckoutAddrCreatorComponent } from './address-creator';
import { InvoicePageComponent } from './invoice';

export const routes = {
  path: 'checkout',
  component: CheckoutRouteComponent,
  resolve: { checkoutItems: CheckoutItemsResolver },
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
};
