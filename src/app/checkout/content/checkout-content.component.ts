import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, CartService, ICheckout, LocalCheckoutService, OrderService } from '../../core';
import { AddressItemComponent } from '../../address';
import { Header1Component } from '../../header-bar';
import { CheckoutItemComponent } from './checkout-item.component';

@Component({
  selector: 'checkout-content',
  template: require('./checkout-content.html'),
  directives: [AddressItemComponent, Header1Component, CheckoutItemComponent],
})
export class CheckoutContentComponent {

  checkout: ICheckout;

  _total: number;

  constructor(
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

  get payMethod() {
    return this.checkout.IsDeliverPay ? '货到付款' : '在线付款';
  }

  get invoice() {
    return this.checkout.Invoice ? this.checkout.Invoice.To : '不需要发票';
  }

  onCheckout() {
    this.orderService.checkout(this.checkout).subscribe(orderId => {
      let src = this.router.routerState.snapshot.queryParams['src'];
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
