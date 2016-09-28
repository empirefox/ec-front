import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';

@Component({
  selector: 'home-special-offer',
  template: require('./special-offer.html'),
  styles: [require('./special-offer.css')],
})
export class HomeSpecialOfferComponent {

  item: IProduct; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['specialOffer'], sz: 4 })).
      take(1).subscribe(items => {
        items.slice(0, 3).forEach(item => this.prices[item.ID] = item.skus.map(sku => sku.SalePrice).sort().shift());
        this.item = items.shift();
        this.items = items;
      });
  }

  gotoProduct(product: IProduct) {
    this.localProductService.publish(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.skus[0].Img; }

}
