import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from '../../core';

@Component({
  selector: 'home-special-offer',
  templateUrl: './special-offer.html',
  styleUrls: ['./special-offer.css'],
})
export class HomeSpecialOfferComponent {

  item: IProduct; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['特供品'], sz: 3 })).
      take(1).subscribe(items => {
        items.forEach(item => this.prices[item.ID] = item.skus.map(sku => sku.SalePrice).sort().shift());
        this.item = items.shift();
        this.items = items;
      });
  }

  gotoProduct(product: IProduct) {
    this.productService.setCurrent(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.skus[0].Img; }

}
