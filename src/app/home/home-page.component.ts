import { Component } from '@angular/core';
import { IProduct, ProductService } from '../core';
import { HomeTopBarComponent } from './1.top-bar';
import { HomeNavBarComponent } from './2.nav-bar';
import { HomeGroupBuyComponent } from './3.group';
import { HomeSpecialOfferComponent } from './4.special-offer';
import { HomeFeaturedComponent } from './5.featured';
import { HomeLifeComponent } from './6.life';
import { HomeRecommendComponent } from './7.recommend';
import { HomeAdSlideComponent } from './ad-slide';

@Component({
  selector: 'home-page',
  template: require('./home-page.html'),
  directives: [
    HomeTopBarComponent,
    HomeNavBarComponent,
    HomeGroupBuyComponent,
    HomeSpecialOfferComponent,
    HomeFeaturedComponent,
    HomeLifeComponent,
    HomeRecommendComponent,
    HomeAdSlideComponent,
  ],
})
export class HomePageComponent {

  items: IProduct[];

  constructor(private productService: ProductService) { }

  // TODO support 'SpecialOffer+Featured+Life+Recommend+AdSlides'
  ngOnInit() {
    this.productService.query({ sp: 'AdSlides' }).subscribe(items => this.items = items);
  }

}
