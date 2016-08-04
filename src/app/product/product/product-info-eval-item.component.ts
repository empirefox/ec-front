import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IEvalItem } from '../../core';

@Component({
  selector: 'product-info-eval-item',
  template: require('./product-info-eval-item.html'),
  styles: [require('./product-info-eval-item.css')],
})
export class ProductInfoEvalItemComponent {

  @Input() item: IEvalItem;

  get starClass() { return 'star' + this.item.RateStar; }

}
