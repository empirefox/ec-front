import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, OrderService } from '../core';

@Component({
  selector: 'group-buy-item',
  template: require('./group-buy-item.html'),
  styles: [require('./group-buy-item.css')],
})
export class GroupBuyItemComponent {

  @Input() item: IGroupBuyItem;

  constructor(
    private router: Router,
    private orderService: OrderService) { }

  get img() { return this.item.Img || this.item.sku.Img; }

  onGotoProduct() {
    let queryParams = { SkuID: this.item.sku.ID };
    this.router.navigate(['/product/1', this.item.sku.ProductID], { queryParams });
  }

  onGroupBuy() {
    this.orderService.setCheckoutItemCache({
      Sku: this.item.sku,
      Quantity: 1,
      GroupBuyID: this.item.ID,
      GroupBuyPrice: this.item.Price,
    });
    this.router.navigate(['/checkout'], { queryParams: { src: 'cache' } });
  }

}
