import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICheckout, OrderService, LocalCheckoutService, ICheckoutItem } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [LocalCheckoutService],
})
export class CheckoutRouteComponent {

  checkout = <ICheckout>({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private localCheckoutService: LocalCheckoutService) { }

  ngOnInit() {
    this.checkout.Items = <ICheckoutItem[]>this.route.snapshot.data['checkoutItems'];
    this.orderService.clearCheckoutItemCache();
    this.localCheckoutService.src$.subscribe();
    this.localCheckoutService.publish(this.checkout);
  }

}
