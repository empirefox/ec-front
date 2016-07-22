import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IProduct, ISku, LocalProductService, LocalSkuService, IAddress, AddressService } from '../../core';

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
    private localProductService: LocalProductService,
    private localSkuService: LocalSkuService) { }

  get salePrice() {
    return this.sku ? this.sku.SalePrice : this.product.Skus[0].SalePrice;
  }

  ngOnInit() {
    this.subAddr = this.addressService.getDefault().subscribe(addr => this.addr = addr);
    this.subProduct = this.localProductService.src$.subscribe(product => this.product = product);
    this.subSku = this.localSkuService.src$.subscribe(sku => this.sku = sku);
  }

  ngOnDestroy() {
    this.subAddr.unsubscribe();
    this.subProduct.unsubscribe();
    this.subSku.unsubscribe();
  }

  onOpenSkus() { this.localSkuService.openSkus(); }

  gotoAddressSelector() { this.router.navigate(['../../addrs'], { relativeTo: this.route }); }

  gotoProductDetail() { this.router.navigate(['../detail'], { relativeTo: this.route }); }

}
