import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductAttrGroup, ProductAttr } from '../core';

@Component({
  selector: 'product-attr-group',
  template: require('./product-attr-group.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttrGroupComponent {

  @Input() group: ProductAttrGroup;
  @Input() current: ProductAttr;

  @Output() attr = new EventEmitter<ProductAttr>();

  onSelect(attr: ProductAttr) {
    if (attr != this.current) {
      this.current = attr;
      this.attr.next(attr);
    }
  }

}
