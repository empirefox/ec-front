import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import unescape = require('lodash/unescape');
import { IProduct } from '../../core';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  encapsulation: ViewEncapsulation.Native,
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
