import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as unescape from 'lodash/unescape';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  // encapsulation: ViewEncapsulation.Native,
})
export class ProductDetailComponent {

  html: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private parent: ProductPageComponent) { }

  ngOnInit() {
    this.parent.product$.subscribe(product => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(unescape(product.Detail));
    });
  }

}
