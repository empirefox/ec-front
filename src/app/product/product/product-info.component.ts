import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IProfile,
  IProduct,
  ISku,
  ProductService,
  IAddress,
  AddressService,
  IEvalItem,
  IProductEval,
  IGroupBuyItem,
  GroupBuyService,
  IStore,
} from '../../core';
import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.css'],
})
export class ProductInfoComponent {

  profile: IProfile;
  product: IProduct;
  addr: IAddress;
  evals: IProductEval;
  evalItems: IEvalItem[];
  store: IStore;
  mapOpened: boolean;
  map: SafeHtml;

  private gbItem: IGroupBuyItem;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private productService: ProductService,
    private groupBuyService: GroupBuyService,
    private parent: ProductPageComponent) { }

  get sku() { return this.product.sku; }
  set sku(sku: ISku) { this.product.sku = sku; }

  get price() {
    return this.gbItem && this.gbItem.sku.ID === this.sku.ID ? this.gbItem.Price : this.salePrice;
  }
  get salePrice() {
    return this.sku ? this.sku.SalePrice : this.product.skus[0].SalePrice;
  }

  get img() { return this.product.Img || this.product.skus[0].Img; }

  ngOnInit() {
    let data = <{ profile: IProfile, address: IAddress, stores: IStore[] }>this.route.snapshot.data;
    this.profile = data.profile;
    this.addr = data.address;
    this.parent.product$.subscribe(product => {
      this.product = product;
      this.productService.getEvals(product).subscribe(evals => {
        this.evals = evals;
        this.evalItems = evals.items.slice(0, 5);
      });
      this.findGroupBuyItem();
      this.store = data.stores[product.StoreID];
      if (this.store && this.store.Amap) {
        this.map = this.sanitizer.bypassSecurityTrustHtml(this.store.Amap);
      }
    });
  }

  onOpenSkus(isBuy) { this.parent.openSkus(isBuy); }

  gotoAddressSelector() { this.router.navigate(['../../../addrs', this.product.ID], { relativeTo: this.route }); }

  gotoProductDetail() { this.router.navigate(['../detail'], { relativeTo: this.route }); }

  gotoEval() { this.router.navigate(['../eval'], { relativeTo: this.route }); };

  private findGroupBuyItem() {
    this.groupBuyService.getItem(this.sku.ID).subscribe(item => this.gbItem = item);
  }
}
