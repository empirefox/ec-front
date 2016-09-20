import { Component, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductService, LocalProductService, IProductEval, IEvalItem } from '../../core';

@Component({
  selector: 'product-eval',
  template: require('./product-eval.html'),
  styles: [require('./product-eval.css')],
})
export class ProductEvalComponent {

  evals: IProductEval;
  current: IEvalItem[];

  private subProduct: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private productService: ProductService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.flatMap(product => this.productService.getEvals(product)).
      subscribe(evals => {
        this.evals = evals;
        this.current = evals.items;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    if (this.subProduct) { this.subProduct.unsubscribe(); }
  }

}
