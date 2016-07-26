import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../../core/address';
import { ICheckout, LocalCheckoutService } from '../../core';
import { Header1Component } from '../../header-bar';
import { AddressEditorComponent } from '../../address';

@Component({
  template: require('./address-creator-page.html'),
  styles: [require('./address-creator-page.css')],
  directives: [Header1Component, AddressEditorComponent],
})
export class AddressCreatorPageComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private localCheckoutService: LocalCheckoutService) { }

  ngOnInit() {
    this.localCheckoutService.src$.subscribe(checkout => this.checkout = checkout);
  }

  onSaved(addr: IAddress) {
    this.checkout.Address = addr;
    this.router.navigate(['/checkout']);
  }

}
