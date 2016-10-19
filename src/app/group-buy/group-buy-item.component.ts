import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IGroupBuyItem, OrderService, IProduct, ProductService } from '../core';

@Component({
  selector: 'group-buy-item',
  templateUrl: './group-buy-item.html',
  styleUrls: ['./group-buy-item.css'],
})
export class GroupBuyItemComponent {

  @Input() item: IGroupBuyItem;

  product$: Observable<IProduct>;

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService) { }

  get img() { return this.item.Img || this.item.sku.Img; }

  // cannot cache product, because there is no product
  onGotoProduct() {
    let queryParams = { SkuID: this.item.sku.ID };
    this.router.navigate(['/product/1', this.item.sku.ProductID], { queryParams });
  }

  onGroupBuy() {
    if (this.item.sku.product) {
      this._onGroupBuy();
      return;
    }

    if (!this.product$) {
      this.product$ = this.productService.getProduct(this.item.sku.ProductID).publishReplay(1).refCount();
    }
    this.product$.subscribe(product => {
      if (product) {
        this.item.sku = product.skus.find(item => item.ID === this.item.sku.ID);
        if (this.item.sku) {
          this._onGroupBuy();
        }
      }
    });
  }

  _onGroupBuy() {
    this.orderService.setCheckoutItemCache({
      Sku: this.item.sku,
      Quantity: 1,
      GroupBuyID: this.item.ID,
      GroupBuyPrice: this.item.Price,
    });
    this.router.navigate(['/checkout'], { queryParams: { src: 'cache' } });
  }

}
