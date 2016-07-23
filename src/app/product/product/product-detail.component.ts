import { Component, Optional, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ProductService, LocalProductService, LocalProductsService } from '../../core';

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
    private route: ActivatedRoute,
    private productService: ProductService,
    @Optional() private localProductService: LocalProductService,
    @Optional() private localProductsService: LocalProductsService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.subProduct = this.productService.getLocalOrRequest(id, this.localProductService, this.localProductsService)
      .subscribe(product => {
        this.html = this.sanitizer.bypassSecurityTrustHtml(product.Detail);
      });
  }

  ngOnDestroy() {
    this.subProduct.unsubscribe();
  }

}
