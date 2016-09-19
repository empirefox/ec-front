import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress, ICheckout, LocalCheckoutService } from '../../core';
import { Header1Component } from '../../header-bar';

@Component({
  template: require('./address-selector-page.html'),
  styles: [require('./address-selector-page.css')],
})
export class CheckoutAddrsComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private localCheckoutService: LocalCheckoutService) { }

  ngOnInit() {
    this.localCheckoutService.src$.subscribe(checkout => this.checkout = checkout);
  }

  onSelected(addr: IAddress) {
    this.checkout.Address = addr;
  }

  gotoCreator() {
    this.router.navigate(['/checkout/address-creator']);
  }

}
