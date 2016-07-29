import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IEvalItem } from '../../core';

@Component({
  selector: 'product-eval-item',
  template: require('./product-eval-item.html'),
  styles: [require('./product-eval-item.css')],
})
export class ProductEvalItemComponent {

  @Input() item: IEvalItem;

  get starClass() { return 'star' + this.item.RateStar; }

}
