import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { QuantityInputModule } from '../quantity-input';

import { CartListPageComponent } from './cart-list-page.component';
import { CartItemComponent } from './cart-item.component';

@NgModule({
  declarations: [
    CartItemComponent,
    CartListPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
    QuantityInputModule,
  ],
  exports: [
    CartListPageComponent,
  ],
})
export class CartModule { }
