import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IProduct, ProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-recommend',
  template: require('./recommend.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRecommendComponent extends HomeSectionBaseComponent {

  items: IProduct[];

  ngOnInit() {
    this.productService.query({ sp: 'Recommend' }).subscribe(items => {
      this.items = items.slice(0, Math.floor(items.length / 2) * 2);
    });
  }

  onGotoProducts() { this.router.navigate(['/product/list']); }

}
