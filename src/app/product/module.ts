import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { AddressModule } from '../address';
import { QuantityInputModule } from '../quantity-input';
import { productRouting } from './routes';

import { ProductRouteComponent } from './product-route.component';
import { ProductsPageComponent } from './products';
import {
  ProductPageComponent,
  ProductInfoComponent,
  ProductDetailComponent,
  ProductEvalComponent,
} from './product';
import { AddressSelectorPageComponent } from './address-selector';
import { AddressCreatorPageComponent } from './address-creator';

import { ProductSkusComponent } from './product/product-skus.component';
import { ProductAttrGroupComponent } from './product/product-attr-group.component';
import { ProductInfoEvalItemComponent } from './product/product-info-eval-item.component';
import { ProductEvalItemComponent } from './product/product-eval-item.component';
import { ProductsItemComponent } from './products/products-item.component';

@NgModule({
  declarations: [
    ProductRouteComponent,
    ProductsPageComponent,
    ProductPageComponent,
    ProductInfoComponent,
    ProductDetailComponent,
    ProductEvalComponent,
    AddressSelectorPageComponent,
    AddressCreatorPageComponent,

    ProductSkusComponent,
    ProductAttrGroupComponent,
    ProductInfoEvalItemComponent,
    ProductEvalItemComponent,
    ProductsItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
    AddressModule,
    QuantityInputModule,
    productRouting,
  ],
  exports: [
    ProductRouteComponent,
    ProductsPageComponent,
    ProductPageComponent,
    ProductInfoComponent,
    ProductDetailComponent,
    ProductEvalComponent,
    AddressSelectorPageComponent,
    AddressCreatorPageComponent,
  ],
})
export class ProductModule { }
