import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { values } from 'lodash';
import { OrderService, IGroupBuyItem, GroupBuyService, ISku, ProductAttr, IProduct, ProductService } from '../../core';
import { QuantityInputComponent } from '../../quantity-input';
import { ProductAttrGroupComponent } from './product-attr-group.component';

@Component({
  selector: 'product-skus',
  template: require('./product-skus.html'),
  styles: [require('./product-skus.css')],
  directives: [QuantityInputComponent, ProductAttrGroupComponent],
})
export class ProductSkusComponent implements OnInit {

  @Input() product: IProduct;

  @Output() dismiss = new EventEmitter<any>();
  @Output() skuChange = new EventEmitter<ISku>();

  private gbItem: IGroupBuyItem;
  private _sku: ISku;
  private current: Dict<ProductAttr> = {};

  constructor(
    private router: Router,
    private orderService: OrderService,
    private groupBuyService: GroupBuyService,
    private productService: ProductService) { }

  ngOnInit() {
    if (!this.sku) {
      this.sku = this.product.Skus[0];
    }
    this.findGroupBuyItem();
  }

  @Input() get sku(): ISku { return this._sku; }
  set sku(sku: ISku) {
    if (this._sku !== sku) {
      this._sku = sku;
      if (sku) {
        sku.Attrs.forEach(attr => this.current[attr.Group.ID] = attr);
      } else {
        this.current = {};
      }
    }
  }

  get img() {
    return this.sku.Img ? this.sku.Img : this.product.Img;
  }

  get price() {
    return this.gbItem && this.gbItem.Sku.ID === this.sku.ID ? this.gbItem.Price : this.sku.SalePrice;
  }

  get stock() {
    return this.sku.Stock;
  }

  get maxQuantity() {
    return this.stock ? this.stock : 1;
  }

  get quantity() {
    return this.sku.Quantity;
  }
  set quantity(q: number) {
    if (this.sku) {
      this.sku.Quantity = q;
    }
  }

  onAttrSelected(attr: ProductAttr) {
    this.current[attr.Group.ID] = attr;
    let sku = this.findSku();
    if (sku !== this.sku) {
      this.sku = sku;
      this.findGroupBuyItem();
      this.skuChange.next(sku);
    }
  }

  onDismiss() {
    this.dismiss.next(0);
  }

  findSku(): ISku {
    return this.productService.findSku(this.product, values<ProductAttr>(this.current));
  }

  private findGroupBuyItem() {
    this.groupBuyService.getItem(this.sku.ID).subscribe(item => this.gbItem = item);
  }
}
