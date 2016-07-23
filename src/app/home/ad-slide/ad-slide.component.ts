import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-ad-slide',
  template: require('./ad-slide.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAdSlideComponent extends HomeSectionBaseComponent {

  @Input() item: IProduct;

  constructor(
    router: Router,
    productService: ProductService,
    localProductService: LocalProductService) {
    super(router, productService, localProductService);
  }

}
