import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductService, ProductContextService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  providers: [ProductContextService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEvalComponent {

  product: IProduct;

  private subProduct: Subscription;

  constructor(
    private productService: ProductService,
    private productContextService: ProductContextService) { }

  ngOnInit() {
    this.subProduct = this.productContextService.asObservable().subscribe(product => this.product = product);
  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
