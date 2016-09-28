import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { constMap, ProfileService, CartService, ICheckout, LocalCheckoutService, OrderService } from '../../core';

@Component({
  selector: 'checkout-content',
  template: require('./checkout-content.html'),
  styles: [require('./checkout-content.css')],
})
export class CheckoutContentComponent {

  checkout: ICheckout;

  _total: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private orderService: OrderService,
    private cartService: CartService,
    private localCheckoutService: LocalCheckoutService) { }

  ngOnInit() {
    this.localCheckoutService.src$.subscribe(checkout => {
      this.checkout = checkout;
      this._total = this.checkout.Items.map(item => (item.GroupBuyPrice || item.Sku.SalePrice) * item.Quantity).reduce((a, b) => a + b, 0);
      let highest = this.checkout.Items.map(item => item.Sku.Freight).sort((b, a) => a - b)[0];
      this.profileService.getProfile().subscribe(profile => {
        this.checkout.DeliverFee = this._total < profile.FreeDeliverLine ? highest : 0;
        this.checkout.Total = this._total + this.checkout.DeliverFee;
      });
    });
  }

  get isPoints() {
    return this.checkout.Items.length === 1 && this.checkout.Items[0].Sku.product.Vpn === constMap.VpnType['TVpnPoints'];
  }

  get payMethod() {
    return this.checkout.IsDeliverPay ? '货到付款' : '在线付款';
  }

  get invoice() {
    return this.checkout.Invoice ? this.checkout.Invoice.To : '不需要发票';
  }

  onCheckout() {
    this.orderService.checkout(this.checkout).subscribe(orderId => {
      let src = this.route.snapshot.queryParams['src'];
      if (src === 'cache') {
        this.orderService.clearCheckoutItemCache();
      } else {
        this.cartService.clear().subscribe();
      }
      this.router.navigate(['/order/detail', orderId], { queryParams: { pay: 'show' } });
    });
  }

  onChangePayMethod() {
    this.checkout.IsDeliverPay = !this.checkout.IsDeliverPay;
  }

  onShowSelecteAddress() {
    this.router.navigate(['/checkout/address-selector']);
  }

  onViewInvoice() {
    this.router.navigate(['/checkout/invoice']);
  }

  // onViewCoupon() {
  //   this.page.next('coupon-selector');
  // }
}
