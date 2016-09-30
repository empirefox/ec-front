import { Component, Input, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  constMap,
  IProfile, ProfileResolver,
  IAddress,
  ICheckout, OrderService, LocalCheckoutBase, ICheckoutItem,
} from '../core';

const provideParent = (component: any, parentType?: any) => {
  return { provide: parentType || LocalCheckoutBase, useExisting: forwardRef(() => component) };
};

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [provideParent(CheckoutRouteComponent)],
})
export class CheckoutRouteComponent implements LocalCheckoutBase {

  profile: IProfile;
  checkout = <ICheckout>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    let data = <{ profile: IProfile, items: ICheckoutItem[], address: IAddress }>this.route.snapshot.data;
    this.profile = data.profile;
    this.checkout.Address = data.address;
    this.checkout.Items = data.items;
    this.orderService.clearCheckoutItemCache();

    let length = this.checkout.Items.length;
    this.checkout.normal = !~this.checkout.Items.findIndex(item => item.Sku.product.Vpn !== constMap.VpnType.TVpnNormal);
    this.checkout.valid = (!this.checkout.normal && length === 1) || (this.checkout.normal && length > 0);
    this.checkout.vpn = length ? this.checkout.Items[0].Sku.product.Vpn : 0;
    this.checkout.isPoints = length === 1 && this.checkout.vpn === constMap.VpnType.TVpnPoints;

    if (this.checkout.valid) {
      if (this.checkout.normal) {
        let total = this.checkout.Items.map(item => (item.GroupBuyPrice || item.Sku.SalePrice) * item.Quantity).reduce((a, b) => a + b, 0);
        let highest = this.checkout.Items.map(item => item.Sku.Freight).sort((b, a) => a - b)[0];
        this.checkout.DeliverFee = total < this.profile.FreeDeliverLine ? highest : 0;
        this.checkout.Total = total + this.checkout.DeliverFee;
      } else {
        this.checkout.DeliverFee = 0;
        this.checkout.Total = this.checkout.Items[0].Sku.SalePrice;
      }
    }
  }

}
