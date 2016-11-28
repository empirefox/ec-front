import { Component } from '@angular/core';
import { ProductService, IProductEval, IEvalItem } from '../../core';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-eval',
  templateUrl: './product-eval.html',
  styleUrls: ['./product-eval.css'],
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
