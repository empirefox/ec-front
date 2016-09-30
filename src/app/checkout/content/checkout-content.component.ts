import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { constMap, CartService, ICheckout, LocalCheckoutBase, OrderService } from '../../core';

@Component({
  selector: 'checkout-content',
  template: require('./checkout-content.html'),
  styles: [require('./checkout-content.css')],
})
export class CheckoutContentComponent {

  checkout: ICheckout;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private base: LocalCheckoutBase) { }

  ngOnInit() {
    this.checkout = this.base.checkout;
  }

  get payMethod() {
    return this.checkout.IsDeliverPay ? '货到付款' : '在线付款';
  }

  get invoice() {
    return this.checkout.Invoice ? this.checkout.Invoice.To : '不需要发票';
  }

  onCheckout() {
    if (this.checkout.Address && this.checkout.valid) {
      this.orderService.checkout(this.checkout).subscribe(order => {
        // from GroupBuyItemComponent, ProductPageComponent
        let src = this.route.snapshot.queryParams['src'];
        if (src === 'cache') {
          this.orderService.clearCheckoutItemCache();
        } else {
          this.cartService.delete(this.checkout.Items.map(item => item.Sku.ID)).subscribe();
        }
        this.router.navigate(['/order/detail', order.ID], { queryParams: { paying: order.ID } });
      });
    }
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
