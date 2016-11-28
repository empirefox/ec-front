import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IWishItem, WishlistService, ProductService } from '../core';

@Component({
  templateUrl: './wishlist-page.html',
  styleUrls: ['./wishlist-page.css'],
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
    this.wishlistService.delete([item.ProductID]).subscribe(_ => this.reset());
  }

  reset() {
    this.wishlistService.getItems().subscribe(items => this.items = items);
  }

}
