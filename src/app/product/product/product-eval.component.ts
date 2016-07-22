import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, LocalProductService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEvalComponent {

  product: IProduct;

  private subProduct: Subscription;

  constructor(private localProductService: LocalProductService) { }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.subscribe(product => {
      this.product = product;
    });
  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
