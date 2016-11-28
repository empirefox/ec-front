import { Component, Input } from '@angular/core';
import { IEvalItem } from '../../core';

@Component({
  selector: 'product-info-eval-item',
  templateUrl: './product-info-eval-item.html',
  styleUrls: ['./product-info-eval-item.css'],
})
export class ProductInfoEvalItemComponent {

  @Input() item: IEvalItem;

  get starClass() { return 'star' + this.item.RateStar; }

}
