import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { LocalProductService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {

  html: SafeHtml;

  private subProduct: Subscription;

  constructor(
    private sanitizer: DomSanitizationService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.subscribe(product => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(product.Detail);
    });
  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
