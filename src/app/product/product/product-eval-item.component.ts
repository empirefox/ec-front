import { Component, Input } from '@angular/core';
import { IEvalItem } from '../../core';

@Component({
  selector: 'product-eval-item',
  templateUrl: './product-eval-item.html',
  styleUrls: ['./product-eval-item.css'],
})
export class ProductEvalItemComponent {

  @Input() item: IEvalItem;

  get starClass() { return 'star' + this.item.RateStar; }

}
