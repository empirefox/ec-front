import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IWishItem, WishlistService, ProductService } from '../core';

@Component({
  template: require('./wishlist-page.html'),
  styles: [require('./wishlist-page.css')],
})
export class WishlistPageComponent {

  items: IWishItem[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService) { }

  ngOnInit() {
    this.reset();
  }

  onGotoProduct(item: IWishItem) {
    this.productService.setCurrent(item.product);
    this.router.navigate(['/product/1', item.ProductID]);
  }

  onDel(item: IWishItem) {
    this.wishlistService.delete(item.ID).subscribe(_ => this.reset());
  }

  private reset() {
    this.wishlistService.getItems().subscribe(items => this.items = items);
  }

}
