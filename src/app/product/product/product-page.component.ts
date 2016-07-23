import { Component, Optional, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CartService,
  IWishItem,
  WishlistService,
  ICheckoutItem,
  OrderService,
  IGroupBuyItem,
  GroupBuyService,
  IProduct,
  ISku,
  ProductAttrGroup,
  ProductService,
  LocalProductService,
  LocalProductsService,
  LocalSkuService
} from '../../core';
import { HeaderBarComponent } from '../../header-bar';
import { ProductSkusComponent } from './product-skus.component';

@Component({
  selector: 'product-page',
  template: require('./product-page.html'),
  directives: [
    HeaderBarComponent,
    ProductSkusComponent,
  ],
  providers: [LocalSkuService],
})
export class ProductPageComponent implements OnInit {

  product: IProduct;

  inWishlist: boolean;
  canOpertaeWishlist: boolean = true;

  private cartLen: number;
  private showSkus: boolean;
  private groups: ProductAttrGroup[];
  private skus: ISku[];

  private _sku: ISku;
  private groupBuyItem: IGroupBuyItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private groupBuyService: GroupBuyService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    @Optional() private localProductService: LocalProductService,
    @Optional() private localProductsService: LocalProductsService,
    private localSkuService: LocalSkuService) { }

  ngOnInit() {
    this.localSkuService.src$.subscribe();
    this.localSkuService.openSkus$.subscribe(_ => this.onOpenSkus(1));

    let id = +this.route.snapshot.params['id'];
    this.productService.getLocalOrRequest(id, this.localProductService, this.localProductsService).subscribe(product => {
      this.product = product;
      this.proccessSkus();
      this.refreshWishlist();
    });
    this.setCartLen();
  }

  get sku() { return this._sku; }
  set sku(sku: ISku) {
    if (this._sku !== sku) {
      this._sku = sku;
      this.localSkuService.publish(sku);
    }
  }

  onGotoKefu() { }

  onGuanzhu() {
    if (this.canOpertaeWishlist) {
      this.canOpertaeWishlist = false;
      (this.inWishlist ? this.wishlistService.delete : this.wishlistService.add)(this.product.ID).subscribe(
        _ => this.refreshWishlist(),
        _ => this.canOpertaeWishlist = true,
        () => this.canOpertaeWishlist = true
      );
    }
  }

  onGotoCart() { this.router.navigate(['/cart']); }

  onSkuChange(sku: ISku) { this.sku = sku; }

  onOpenSkus(isBuy) {
    // opened
    if (this.showSkus) {
      if (this.sku) {
        if (isBuy) {
          let cache: ICheckoutItem = { Sku: this.sku, Quantity: this.sku.Quantity };
          if (this.groupBuyItem) {
            cache.GroupBuyID = this.groupBuyItem.ID;
            cache.GroupBuyPrice = this.groupBuyItem.Price;
          }
          this.orderService.setCheckoutItemCache(cache);
          this.router.navigate(['/checkout'], { queryParams: { src: 'cache' } });
        } else if (this.sku && this.sku.Quantity) {
          this.cartService.add(this.sku, this.sku.Quantity).take(1).subscribe(_ => this.setCartLen());
        }
      }
    } else {
      this.showSkus = true;
    }
  }

  onCloseSkus() { this.showSkus = false; }

  private refreshWishlist() {
    this.wishlistService.getItems().subscribe(items => this.inWishlist = items.some(item => item.ProductID === this.product.ID));
  }

  private proccessSkus() {
    this.productService.proccessSkus(this.product).take(1).subscribe(p => {
      this.groups = p.Groups;
      this.skus = p.Skus;
      this.sku = this.skus[0];
      let skuId = +this.router.routerState.snapshot.queryParams['SkuID'];
      this.groupBuyService.getItem(skuId).subscribe(item => {
        this.groupBuyItem = item;
        this.sku = this.skus.find(sku => sku.ID === item.Sku.ID);
        this.onOpenSkus(1);
      });
    });
  }

  private setCartLen() {
    this.cartService.getItems().take(1).subscribe(items => this.cartLen = items ? items.length : 0);
  }

}
