import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, ICheckout, LocalCheckoutService } from '../../core';

@Component({
  template: require('./invoice-page.html'),
  styles: [require('./invoice-page.css')],
})
export class InvoicePageComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private localCheckoutService: LocalCheckoutService) { }

  ngOnInit() {
    this.localCheckoutService.src$.subscribe(checkout => this.checkout = checkout);
  }

  onEdited(invoice: Invoice) {
    this.checkout.Invoice = invoice;
    this.router.navigate(['/checkout']);
  }

}
