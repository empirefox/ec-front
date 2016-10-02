import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quantity-input',
  templateUrl: './quantity-input.html',
  styleUrls: ['./quantity-input.css'],
})

export class QuantityInputComponent implements OnInit {

  @Input() max: number;
  @Output() valueChange = new EventEmitter<number>();


  private min = 1;

  private _value: number = 1;

  get value() { return this._value; }
  @Input() set value(value: number) {
    if (value !== this._value) {
      // value = (value && value > 1) ? (value > this.max ? this.max : value) : 1;
      this._value = value;
      this.valueChange.next(value);
    }
  }

  ngOnInit() {
    if (this.max < 1) {
      this.max = undefined;
    }
  }

  onMinus() {
    if (this.value && this.value <= 1) {
      this.value = 1;
    } else if (this.value && this.value > this.max) {
      this.value = this.max;
    } else {
      this.value--;
    }
  }

  onAdd() {
    if (!this.value) {
      this.value = 1;
    } else if (this.value && this.value >= this.max) {
      this.value = this.max;
    } else {
      this.value++;
    }
  }

  onTouched(input) {
    if (input && this._value !== (+input.value)) {
      input.value = this._value;
    }
  }

}
