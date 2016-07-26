import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, LocalProductService } from '../../core';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.html'),
  styles: [require('./product-detail.css')],
})
export class ProductDetailComponent {

  html: SafeHtml;

  private subProduct: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizationService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.subscribe(product => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(product.Detail);
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.subProduct) { this.subProduct.unsubscribe(); }
  }

}
