import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { IInvoice } from '../../core';

@Component({
  selector: 'invoice',
  template: require('./invoice.html'),
  styles: [require('./invoice.css')],
})
export class InvoiceComponent implements OnInit {

  @Input() origin: IInvoice;
  @Output() edited = new EventEmitter<IInvoice>();

  need: boolean;
  invoice: IInvoice;

  ngOnInit() {
    this.invoice = <IInvoice>JSON.parse(JSON.stringify(this.origin || {}));
  }

  onOk() {
    this.edited.next(this.need ? this.invoice : null);
  }

}
