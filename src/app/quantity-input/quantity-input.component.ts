import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'quantity-input',
  template: require('./quantity-input.html'),
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: QuantityInputComponent,
    multi: true
  }],
})

export class QuantityInputComponent implements ControlValueAccessor, OnInit {
  @Input() max: number;
  private min = 1;

  private _value: number = 1;

  get value() { return this._value; }

  @Input() set value(value: number) {
    if (value != this._value) {
      value = (value && value > 1) ? (value > this.max ? this.max : value) : 1;
      this._value = value;
      this.onChange(value);
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

  writeValue(value: number) {
    this.value = value;
  }

  onChange = (event) => { };
  onTouched = (input) => {
    if (input && this._value !== (+input.value)) {
      input.value = this._value;
    }
    if (this._onTouched) {
      this._onTouched();
    }
  };

  _onTouched: () => void;
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
}
