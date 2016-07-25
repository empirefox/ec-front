import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductContextService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  providers: [ProductContextService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {

  html: SafeHtml;

  private subProduct: Subscription;

  constructor(
    private sanitizer: DomSanitizationService,
    private productContextService: ProductContextService) { }

  ngOnInit() {
    this.subProduct = this.productContextService.asObservable().subscribe(product => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(product.Detail);
    });
  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
