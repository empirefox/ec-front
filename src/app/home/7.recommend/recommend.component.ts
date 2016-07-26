import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-recommend',
  template: require('./recommend.html'),
  styles: [require('./recommend.css')],
})
export class HomeRecommendComponent extends HomeSectionBaseComponent {

  items: IProduct[];

  constructor(
    router: Router,
    productService: ProductService,
    localProductService: LocalProductService) {
    super(router, productService, localProductService);
  }

  ngOnInit() {
    this.productService.query({ sp: 'Recommend' }).subscribe(items => {
      this.items = items.slice(0, Math.floor(items.length / 2) * 2);
    });
  }

  onGotoProducts() { this.router.navigate(['/product/list']); }

}
