import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IProduct, ProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-special-offer',
  template: require('./special-offer.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSpecialOfferComponent extends HomeSectionBaseComponent {

  item: IProduct; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  ngOnInit() {
    this.productService.query({ sp: 'SpecialOffer' }).subscribe(items => {
      items.slice(0, 3).forEach(item => this.prices[item.ID] = item.Skus.map(sku => sku.SalePrice).sort().shift());
      this.item = items.shift();
      this.items = items;
    });
  }

}
