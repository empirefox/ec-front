import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, OrderService } from '../core';

@Component({
  selector: 'group-buy-item',
  template: require('./group-buy-item.html'),
  styles: [require('./group-buy-item.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupBuyItemComponent {

  @Input() item: IGroupBuyItem;

  constructor(
    private router: Router,
    private orderService: OrderService) { }

  get img() { return this.item.Img || this.item.Sku.Img; }

  onGotoProduct() {
    let queryParams = { SkuID: this.item.Sku.ID };
    this.router.navigate(['/product/1', this.item.Sku.ProductID], { queryParams });
  }

  onGroupBuy() {
    this.orderService.setCheckoutItemCache({
      Sku: this.item.Sku,
      Quantity: 1,
      GroupBuyID: this.item.ID,
      GroupBuyPrice: this.item.Price,
    });
    this.router.navigate(['/checkout'], { queryParams: { src: 'cache' } });
  }

}
