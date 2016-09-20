import { Component } from '@angular/core';
import { IProduct, ProductService } from '../core';

@Component({
  selector: 'home-page',
  template: require('./home-page.html'),
  styles: [require('./home-page.css')],
})
export class HomePageComponent {

  items: IProduct[] = [];

  constructor(private productService: ProductService) { }

  // TODO support 'SpecialOffer+Featured+Life+Recommend+AdSlides'
  ngOnInit() {
    this.productService.query({ sp: 'AdSlides' }).subscribe(items => this.items = items);
  }

}
