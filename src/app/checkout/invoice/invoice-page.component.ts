import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, ICheckout, LocalCheckoutBase } from '../../core';

@Component({
  templateUrl: './invoice-page.html',
  styleUrls: ['./invoice-page.css'],
})
export class InvoicePageComponent {

  checkout: ICheckout;

  constructor(
    private router: Router,
    private base: LocalCheckoutBase) { }

  ngOnInit() {
    this.checkout = this.base.checkout;
  }

  onEdited(invoice: Invoice) {
    this.checkout.Invoice = invoice;
    this.router.navigate(['/checkout']);
  }

}
