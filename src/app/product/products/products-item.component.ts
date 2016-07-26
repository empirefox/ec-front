import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../core';

@Component({
  selector: 'products-item',
  template: require('./products-item.html'),
  styles: [require('./products-item.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsItemComponent {

  @Input() product: IProduct;

  get img() { return this.product.Img || this.product.Skus[0].Img; }

}
