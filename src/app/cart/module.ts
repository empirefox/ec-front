import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { CartListPageComponent } from './cart-list-page.component';
import { CartItemComponent } from './cart-item.component';

@NgModule({
  declarations: [
    CartItemComponent,
    CartListPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CartListPageComponent,
  ],
})
export class CartModule { }
