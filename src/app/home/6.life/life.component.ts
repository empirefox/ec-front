import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from '../../core';

const COLORS = ['text-fd', 'text-b6', 'text-yellow'];

@Component({
  selector: 'home-life',
  templateUrl: './life.html',
  styleUrls: ['./life.css'],
})
export class HomeLifeComponent {

  first: IProduct[]; // first item
  items: IProduct[];
  prices: Dict<number> = {};
  colors = COLORS;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['life'], sz: 2 * 3 })).
      take(1).subscribe(items => {
        items.forEach(item => this.prices[item.ID] = item.skus.map(sku => sku.SalePrice).sort().shift());
        this.first = items.slice(0, 3);
        this.items = items.slice(3, 5);
      });
  }

  gotoProduct(product: IProduct) {
    this.productService.setCurrent(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.skus[0].Img; }

}
