import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductService, LocalProductService, LocalProductsService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEvalComponent {

  product: IProduct;

  private subProduct: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    @Optional() private localProductService: LocalProductService,
    @Optional() private localProductsService: LocalProductsService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.subProduct = this.productService.getLocalOrRequest(id, this.localProductService, this.localProductsService).
      subscribe(product => this.product = product);

  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
