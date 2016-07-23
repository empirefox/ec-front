import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

const COLORS = ['text-fd', 'text-b6', 'text-yellow'];

@Component({
  selector: 'home-life',
  template: require('./life.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLifeComponent extends HomeSectionBaseComponent {

  first: IProduct[]; // first item
  items: IProduct[];
  prices: Dict<number> = {};
  colors = COLORS;

  constructor(
    router: Router,
    productService: ProductService,
    localProductService: LocalProductService) {
    super(router, productService, localProductService);
  }

  ngOnInit() {
    this.productService.query({ sp: 'Life' }).subscribe(items => {
      items.forEach(item => this.prices[item.ID] = item.Skus.map(sku => sku.SalePrice).sort().shift());
      this.first = items.slice(0, 3);
      this.items = items.slice(3, 5);
    });
  }

}
