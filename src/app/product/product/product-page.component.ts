import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
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
  LocalSkuService,
  ProductContextService,
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
  providers: [ProductContextService, LocalSkuService],
})
export class ProductPageComponent implements OnInit {

  product: IProduct;

  inWishlist: boolean;
  canOpertaeWishlist: boolean = true;

  private subProduct: Subscription;
  private cartLen: number;
  private showSkus: boolean;
  private groups: ProductAttrGroup[];
  private skus: ISku[];

  private _sku: ISku;
  private groupBuyItem: IGroupBuyItem;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private groupBuyService: GroupBuyService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private productContextService: ProductContextService,
    private localSkuService: LocalSkuService) { }

  ngOnInit() {
    this.localSkuService.src$.subscribe();
    this.localSkuService.openSkus$.subscribe(_ => this.onOpenSkus(1));
    this.subProduct = this.productContextService.asObservable().
      flatMap(p => this.initSkus(p)).flatMap(_ => this.refreshWishlist()).flatMap(_ => this.setCartLen()).
      subscribe(_ => this.cd.markForCheck(), _ => this.cd.markForCheck());
  }

  ngOnDestroy() {
    if (this.subProduct) { this.subProduct.unsubscribe(); }
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
      (this.inWishlist ? this.wishlistService.delete : this.wishlistService.add)(this.product.ID).
        flatMap(_ => this.refreshWishlist()).subscribe(
        _ => this.canOpertaeWishlist = true,
        _ => this.canOpertaeWishlist = true
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
          this.cartService.add(this.sku, this.sku.Quantity).take(1).map(_ => this.setCartLen()).subscribe();
        }
      }
    } else {
      this.showSkus = true;
    }
  }

  onCloseSkus() { this.showSkus = false; }

  private refreshWishlist() {
    return this.wishlistService.getItems().
      map(items => this.inWishlist = items.some(item => item.ProductID === this.product.ID));
  }

  private initSkus(product: IProduct) {
    return this.productService.proccessSkus(product).take(1).flatMap(p => {
      this.groups = p.Groups;
      this.skus = p.Skus;
      this.sku = this.skus[0];
      this.product = p;
      let skuId = +this.router.routerState.snapshot.queryParams['SkuID'];
      return this.groupBuyService.getItem(skuId).map(item => {
        if (item) {
          this.groupBuyItem = item;
          this.sku = this.skus.find(sku => sku.ID === item.Sku.ID);
          this.showSkus = true;
        }
      });
    });
  }

  private setCartLen() {
    return this.cartService.getItems().take(1).map(items => this.cartLen = items ? items.length : 0);
  }

}
