import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IProduct, ProductService } from '../../core';
import { HomeSectionBaseComponent } from '../section-base.component';

@Component({
  selector: 'home-ad-slide',
  template: require('./ad-slide.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAdSlideComponent extends HomeSectionBaseComponent {

  @Input() item: IProduct;

}
