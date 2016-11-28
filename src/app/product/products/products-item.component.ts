import { Component, Input } from '@angular/core';
import { IProduct } from '../../core';

@Component({
  selector: 'products-item',
  templateUrl: './products-item.html',
  styleUrls: ['./products-item.css'],
})
export class ProductsItemComponent {

  @Input() product: IProduct;

  get img() { return this.product.Img || this.product.skus[0].Img; }

}
