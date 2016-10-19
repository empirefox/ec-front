import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  IProfile,
  ProfileService,
  IProduct,
  ISku,
  ProductService,
  IAddress,
  AddressService,
  IEvalItem,
  IProductEval
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private productService: ProductService,
    private parent: ProductPageComponent) { }

  get sku() { return this.product.sku; }
  set sku(sku: ISku) { this.product.sku = sku; }

  get salePrice() {
    return this.sku ? this.sku.SalePrice : this.product.skus[0].SalePrice;
  }

  get img() { return this.product.Img || this.product.skus[0].Img; }

  ngOnInit() {
    let data = <{ profile: IProfile, address: IAddress }>this.route.snapshot.data;
    this.profile = data.profile;
    this.addr = data.address;
    this.parent.product$.subscribe(product => {
      this.product = product;
      this.productService.getEvals(product).subscribe(evals => {
        this.evals = evals;
        this.evalItems = evals.items.slice(0, 5);
      });
    });
  }

  onOpenSkus(isBuy) { this.parent.openSkus(isBuy); }

  gotoAddressSelector() { this.router.navigate(['../../../addrs', this.product.ID], { relativeTo: this.route }); }

  gotoProductDetail() { this.router.navigate(['../detail'], { relativeTo: this.route }); }

  gotoEval() { this.router.navigate(['../eval'], { relativeTo: this.route }); };

}
