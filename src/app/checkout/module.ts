import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { AddressModule } from '../address';
import { checkoutRouting } from './routes';

import { CheckoutRouteComponent } from './checkout-route.component';
import { CheckoutContentComponent, CheckoutItemComponent } from './content';
import { CheckoutAddrsComponent } from './address-selector';
import { CheckoutAddrCreatorComponent } from './address-creator';
import { InvoicePageComponent, InvoiceComponent } from './invoice';

import { CheckoutItemsResolver } from './checkout.resolver';

@NgModule({
  declarations: [
    CheckoutRouteComponent,
    CheckoutContentComponent, CheckoutItemComponent,
    CheckoutAddrsComponent,
    CheckoutAddrCreatorComponent,
    InvoicePageComponent, InvoiceComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AddressModule,
    checkoutRouting,
  ],
  exports: [
    CheckoutRouteComponent,
    CheckoutContentComponent,
    CheckoutAddrsComponent,
    CheckoutAddrCreatorComponent,
    InvoicePageComponent,
  ],
  providers: [
    CheckoutItemsResolver,
  ],
})
export class CheckoutModule { }
