import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductAttrGroup, ProductAttr } from '../../core';

@Component({
  selector: 'product-attr-group',
  templateUrl: './product-attr-group.html',
  styleUrls: ['./product-attr-group.css'],
})
export class ProductAttrGroupComponent {

  @Input() group: ProductAttrGroup;
  @Input() current: ProductAttr;

  @Output() attr = new EventEmitter<ProductAttr>();

  onSelect(attr: ProductAttr) {
    if (attr !== this.current) {
      this.current = attr;
      this.attr.next(attr);
    }
  }

}
