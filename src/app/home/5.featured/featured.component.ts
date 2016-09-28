import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';

@Component({
  selector: 'home-featured',
  template: require('./featured.html'),
  styles: [require('./featured.css')],
})
export class HomeFeaturedComponent {

  first: IProduct[]; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['featured'], sz: 2 + 4 })).
      take(1).subscribe(items => {
        items.forEach(item => this.prices[item.ID] = item.skus.map(sku => sku.SalePrice).sort().shift());
        this.first = items.slice(0, 2);
        items = items.slice(2);
        this.items = items.slice(0, Math.floor(items.length / 4) * 4);
      });
  }

  gotoProduct(product: IProduct) {
    this.localProductService.publish(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.skus[0].Img; }

}
