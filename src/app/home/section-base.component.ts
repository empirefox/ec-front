import { Router } from '@angular/router';
import { IProduct, ProductService, LocalProductService } from '../core';

export class HomeSectionBaseComponent {

  constructor(
    public router: Router,
    public productService: ProductService,
    public localProductService: LocalProductService) { }

  onGotoProduct(product: IProduct) {
    this.localProductService.publish(product);
    this.router.navigate(['/product/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.Img || product.Skus[0].Img; }

}
