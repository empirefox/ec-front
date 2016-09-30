import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress, ICheckout, LocalCheckoutBase } from '../../core';

@Component({
  template: require('./address-selector-page.html'),
  styles: [require('./address-selector-page.css')],
})
export class CheckoutAddrsComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private base: LocalCheckoutBase) { }

  ngOnInit() {
    this.checkout = this.base.checkout;
  }

  onSelected(addr: IAddress) {
    this.checkout.Address = addr;
  }

  gotoCreator() {
    this.router.navigate(['/checkout/address-creator']);
  }

}
