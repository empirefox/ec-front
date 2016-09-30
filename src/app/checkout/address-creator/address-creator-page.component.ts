import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress, ICheckout, LocalCheckoutBase } from '../../core';

@Component({
  template: require('./address-creator-page.html'),
  styles: [require('./address-creator-page.css')],
})
export class CheckoutAddrCreatorComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private base: LocalCheckoutBase) { }

  ngOnInit() {
    this.checkout = this.base.checkout;
  }

  onSaved(addr: IAddress) {
    this.checkout.Address = addr;
    this.router.navigate(['/checkout']);
  }

}
