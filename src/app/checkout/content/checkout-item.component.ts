import { Component, Input } from '@angular/core';
import { ICheckout, ICheckoutItem } from '../../core';

@Component({
  selector: 'checkout-item',
  template: require('./checkout-item.html'),
})
export class CheckoutItemComponent {

  @Input() item: ICheckoutItem;

  get img() {
    return this.item.Sku.Img ? this.item.Sku.Img : this.item.Sku.Product.Img;
  }

  get price() {
    return this.item.GroupBuyPrice || this.item.Sku.SalePrice;
  }

}
