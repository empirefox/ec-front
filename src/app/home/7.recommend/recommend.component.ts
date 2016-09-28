import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../../core';

@Component({
  selector: 'home-recommend',
  template: require('./recommend.html'),
  styles: [require('./recommend.css')],
})
export class HomeRecommendComponent {

  items: IProduct[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['recommend'], sz: 3 * 2 })).
      take(1).subscribe(items => {
        this.items = items.slice(0, Math.floor(items.length / 2) * 2);
      });
  }

  gotoProducts() { this.router.navigateByUrl('/product/list'); }

  gotoProduct(product: IProduct) {
    this.localProductService.publish(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.skus[0].Img; }

}
