import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct, ProductService, IProductEval, IEvalItem } from '../../core';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-eval',
  template: require('./product-eval.html'),
  styles: [require('./product-eval.css')],
})
export class ProductEvalComponent {

  evals: IProductEval;
  current: IEvalItem[];

  constructor(
    private productService: ProductService,
    private parent: ProductPageComponent) { }

  ngOnInit() {
    this.parent.product$.flatMap(product => this.productService.getEvals(product)).
      subscribe(evals => {
        this.evals = evals;
        this.current = evals.items;
      });
  }

}
