import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Invoice } from '../../core';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.css'],
})
export class InvoiceComponent implements OnInit {

  @Input() origin: Invoice;
  @Output() edited = new EventEmitter<Invoice>();

  to = new FormControl('', Validators.required);

  need: boolean;
  invoice: Invoice;

  ngOnInit() {
    this.invoice = <Invoice>JSON.parse(JSON.stringify(this.origin || {}));
  }

  onOk() {
    this.edited.next(this.need ? this.invoice : null);
  }

}
