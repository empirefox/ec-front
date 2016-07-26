import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-special-offer',
  template: require('./special-offer.html'),
  styles: [require('./special-offer.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSpecialOfferComponent extends HomeSectionBaseComponent {

  item: IProduct; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    router: Router,
    productService: ProductService,
    localProductService: LocalProductService) {
    super(router, productService, localProductService);
  }

  ngOnInit() {
    this.productService.query({ sp: 'SpecialOffer' }).subscribe(items => {
      items.slice(0, 3).forEach(item => this.prices[item.ID] = item.Skus.map(sku => sku.SalePrice).sort().shift());
      this.item = items.shift();
      this.items = items;
    });
  }

}
