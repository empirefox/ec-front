import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import values from 'lodash/values';
import { OrderService, IGroupBuyItem, GroupBuyService, ISku, ProductAttr, IProduct, ProductService } from '../../core';

@Component({
  selector: 'product-skus',
  templateUrl: './product-skus.html',
  styleUrls: ['./product-skus.css'],
})
export class ProductSkusComponent implements OnInit {

  @Input() product: IProduct;

  @Output() dismiss = new EventEmitter<any>();
  // @Output() skuChange = new EventEmitter<ISku>();

  private gbItem: IGroupBuyItem;
  private current: Dict<ProductAttr> = {};

  constructor(
    private router: Router,
    private orderService: OrderService,
    private groupBuyService: GroupBuyService,
    private productService: ProductService) { }

  ngOnInit() {
    this.sku = this.sku || this.product.skus[0];
    this.findGroupBuyItem();
  }

  get sku(): ISku { return this.product.sku; }
  set sku(sku: ISku) {
    if (this.product.sku !== sku) {
      this.product.sku = sku;
      if (sku) {
        sku.attrs.forEach(attr => this.current[attr.Group.ID] = attr);
      } else {
        this.current = {};
      }
    }
  }

  get img() {
    return this.sku.Img ? this.sku.Img : this.product.Img;
  }

  get price() {
    return this.gbItem && this.gbItem.sku.ID === this.sku.ID ? this.gbItem.Price : this.sku.SalePrice;
  }

  get stock() {
    return this.sku.Stock;
  }

  get maxQuantity() {
    return this.stock ? this.stock : 1;
  }

  get quantity() {
    return this.sku.quantity;
  }
  set quantity(q: number) {
    if (this.sku) {
      this.sku.quantity = q;
    }
  }

  onAttrSelected(attr: ProductAttr) {
    this.current[attr.Group.ID] = attr;
    let sku = this.findSku();
    if (sku !== this.sku) {
      this.sku = sku;
      this.findGroupBuyItem();
      // this.skuChange.next(sku);
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
