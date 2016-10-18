import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { constMap, CartService, ICheckout, LocalCheckoutBase, OrderService } from '../../core';

@Component({
  selector: 'checkout-content',
  templateUrl: './checkout-content.html',
  styleUrls: ['./checkout-content.css'],
})
export class CheckoutContentComponent {

  checkout: ICheckout;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private base: LocalCheckoutBase) { }

  ngOnInit() {
    this.checkout = this.base.checkout;
    if (!this.checkout.valid) {
      this.location.back();
    }
  }

  get payMethod() {
    return this.checkout.IsDeliverPay ? '货到付款' : '在线付款';
  }

  get invoice() {
    return this.checkout.Invoice ? this.checkout.Invoice.To : '不需要发票';
  }

  get valid() { return this.checkout.Address && this.checkout.valid; }

  onCheckout() {
    if (this.valid) {
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
