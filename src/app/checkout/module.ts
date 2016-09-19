import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { QuantityInputModule } from '../quantity-input';
import { AddressModule } from '../address';
import { checkoutRouting } from './routes';

import { CheckoutRouteComponent } from './checkout-route.component';
import { CheckoutContentComponent, CheckoutItemComponent } from './content';
import { CheckoutAddrsComponent } from './address-selector';
import { CheckoutAddrCreatorComponent } from './address-creator';
import { InvoicePageComponent, InvoiceComponent } from './invoice';

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
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
    QuantityInputModule,
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
})
export class CheckoutModule { }
