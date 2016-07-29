import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import {
  IProduct,
  ISku,
  ProductService,
  LocalProductService,
  LocalSkuService,
  IAddress,
  AddressService,
  IEvalItem,
  IProductEval
} from '../../core';
import { ProductInfoEvalItemComponent } from './product-info-eval-item.component';

@Component({
  selector: 'product-info',
  template: require('./product-info.html'),
  styles: [require('./product-info.css')],
  directives: [ProductInfoEvalItemComponent],
})
export class ProductInfoComponent {

  product: IProduct;
  sku: ISku;
  addr: IAddress;
  evals: IProductEval;
  evalItems: IEvalItem[];

  private subAddr: Subscription;
  private subProduct: Subscription;
  private subSku: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private productService: ProductService,
    private localProductService: LocalProductService,
    private localSkuService: LocalSkuService) { }

  get salePrice() {
    return this.sku ? this.sku.SalePrice : this.product.Skus[0].SalePrice;
  }

  get img() { return this.product.Img || this.product.Skus[0].Img; }

  ngOnInit() {
    this.subProduct = this.localProductService.src$.subscribe(product => {
      this.product = product;
      this.productService.getEvals(product).take(1).subscribe(evals => {
        this.evals = evals;
        this.evalItems = evals.items.slice(0, 5);
      });
      this.cd.markForCheck();
    });
    this.subAddr = this.addressService.getDefault().subscribe(addr => this.addr = addr);
    this.subSku = this.localSkuService.src$.subscribe(sku => this.sku = sku);
  }

  ngOnDestroy() {
    if (this.subAddr) { this.subAddr.unsubscribe(); }
    if (this.subProduct) { this.subProduct.unsubscribe(); }
    if (this.subSku) { this.subSku.unsubscribe(); }
  }

  onOpenSkus() { this.localSkuService.openSkus(); }

  gotoAddressSelector() { this.router.navigate(['../../addrs'], { relativeTo: this.route }); }

  gotoProductDetail() { this.router.navigate(['../detail'], { relativeTo: this.route }); }

  gotoEval() { this.router.navigate(['../eval'], { relativeTo: this.route }); };

  gotoKefu() { }

}
