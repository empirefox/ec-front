import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { values } from 'lodash';
import { OrderService, IGroupBuyItem, GroupBuyService, ISku, ProductAttr, IProduct, ProductService } from '../../core';
import { QuantityInputComponent } from '../../quantity-input';
import { ProductAttrGroupComponent } from './product-attr-group.component';

@Component({
  selector: 'product-skus',
  template: require('./product-skus.html'),
  directives: [QuantityInputComponent, ProductAttrGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSkusComponent implements OnInit {

  @Input() product: IProduct;
  @Input() sku: ISku;

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
    if (this.sku && this.sku.Attrs) {
      this.sku.Attrs.forEach(attr => this.current[attr.Group.ID] = attr);
      this.findGroupBuyItem();
    }
  }

  get img() {
    return this.sku ? (this.sku.Img ? this.sku.Img : this.product.Img) : this.product.Img;
  }

  get price() {
    return this.gbItem && this.gbItem.Sku.ID === this.sku.ID ? this.gbItem.Price : (this.sku ? this.sku.SalePrice : 0);
  }

  get stock() {
    return this.sku ? this.sku.Stock : 0;
  }

  get maxQuantity() {
    return this.stock ? this.stock : 1;
  }

  get quantity() {
    return this.sku ? this.sku.Quantity : 1;
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
