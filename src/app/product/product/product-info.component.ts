import { Component, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ISku, ProductService, LocalProductService, LocalProductsService, LocalSkuService, IAddress, AddressService } from '../../core';

@Component({
  selector: 'product-info',
  template: require('./product-info.html'),
})
export class ProductInfoComponent {

  product: IProduct;
  sku: ISku;
  addr: IAddress;

  private subAddr: Subscription;
  private subProduct: Subscription;
  private subSku: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private productService: ProductService,
    @Optional() private localProductService: LocalProductService,
    @Optional() private localProductsService: LocalProductsService,
    @Optional() private localSkuService: LocalSkuService) { }

  get salePrice() {
    return this.sku ? this.sku.SalePrice : this.product.Skus[0].SalePrice;
  }

  get img() { return this.product.Img || this.product.Skus[0].Img; }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.subProduct = this.productService.getLocalOrRequest(id, this.localProductService, this.localProductsService).
      subscribe(product => this.product = product);
    this.subAddr = this.addressService.getDefault().subscribe(addr => this.addr = addr);
    if (this.localSkuService) {
      this.subSku = this.localSkuService.src$.subscribe(sku => this.sku = sku);
    }
  }

  ngOnDestroy() {
    if (this.subAddr) { this.subAddr.unsubscribe(); }
    if (this.subProduct) { this.subProduct.unsubscribe(); }
    if (this.subSku) { this.subSku.unsubscribe(); }
  }

  onOpenSkus() { this.localSkuService.openSkus(); }

  gotoAddressSelector() { this.router.navigate(['../../addrs'], { relativeTo: this.route }); }

  gotoProductDetail() { this.router.navigate(['../detail'], { relativeTo: this.route }); }

}
