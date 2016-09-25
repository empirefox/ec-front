import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Invoice } from '../../core';

@Component({
  selector: 'invoice',
  template: require('./invoice.html'),
  styles: [require('./invoice.css')],
})
export class InvoiceComponent implements OnInit {

  @Input() origin: Invoice;
  @Output() edited = new EventEmitter<Invoice>();

  need: boolean;
  invoice: Invoice;

  ngOnInit() {
    this.invoice = <Invoice>JSON.parse(JSON.stringify(this.origin || {}));
  }

  onOk() {
    this.edited.next(this.need ? this.invoice : null);
  }

}
