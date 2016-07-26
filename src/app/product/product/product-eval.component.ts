import { Component, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductService, LocalProductService } from '../../core';

@Component({
  selector: 'product-eval',
  template: require('./product-eval.html'),
  styles: [require('./product-eval.css')],
})
export class ProductEvalComponent {

  product: IProduct;

  private subProduct: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private productService: ProductService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.subscribe(product => {
      this.product = product;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.subProduct) { this.subProduct.unsubscribe(); }
  }

}
