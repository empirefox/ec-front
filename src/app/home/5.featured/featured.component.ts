import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-featured',
  template: require('./featured.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturedComponent extends HomeSectionBaseComponent {

  first: IProduct[]; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    router: Router,
    productService: ProductService,
    localProductService: LocalProductService) {
    super(router, productService, localProductService);
  }

  ngOnInit() {
    this.productService.query({ sp: 'Featured' }).subscribe(items => {
      items.forEach(item => this.prices[item.ID] = item.Skus.map(sku => sku.SalePrice).sort().shift());
      this.first = items.slice(0, 2);
      items = items.slice(2);
      this.items = items.slice(0, Math.floor(items.length / 4) * 4);
    });
  }

}
