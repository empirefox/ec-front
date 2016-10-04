import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IProduct } from '../../core';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetailComponent {

  html: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private parent: ProductPageComponent) { }

  ngOnInit() {
    this.parent.product$.subscribe(product => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(product.Detail);
    });
  }

}
