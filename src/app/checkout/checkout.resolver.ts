import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICheckoutItem, OrderService, CartService } from '../core';

@Injectable()
export class CheckoutItemsResolver implements Resolve<ICheckoutItem[]> {

  constructor(
    private cartService: CartService,
    private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // from GroupBuyItemComponent, ProductPageComponent
    if (route.queryParams['src'] === 'cache') {
      let cache = this.orderService.getCheckoutItemCache();
      return Observable.of(cache ? [cache] : []);
    }

    return this.cartService.getItems().map(items => {
      return items.filter(item => item.checked).map(item => ({ Sku: item.sku, Quantity: item.Quantity }));
    });
  }
}
