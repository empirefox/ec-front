import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { IMyDate } from 'mydatepicker/src/my-date-picker/interfaces';

const defaultMaxValue = Date.now() / 1000; // now
const defaultMinValue = defaultMaxValue - 100 * 31536000; // 100 year ago

// http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
export function createDateRangeValidator(maxValue, minValue) {
  return (c: FormControl) => {
    let err = {
      rangeError: {
        given: c.value,
        max: maxValue || defaultMaxValue,
        min: minValue || defaultMinValue,
      }
    };

    return (c.value > +maxValue || c.value < +minValue) ? err : null;
  };
}

const myDatePickerNormalOptions = {
  dayLabels: { su: '日', mo: '一', tu: '二', we: '三', th: '四', fr: '五', sa: '六' },
  monthLabels: { 1: '1月', 2: '2月', 3: '3月', 4: '4月', 5: '5月', 6: '6月', 7: '7月', 8: '8月', 9: '9月', 10: '10月', 11: '11月', 12: '12月' },
  todayBtnTxt: '今天',
  dateFormat: 'yyyy-mm-dd',
  firstDayOfWeek: 'mo',
  sunHighlight: true,
  height: '34px',
  width: '260px',
  selectionTxtFontSize: '18px',
  alignSelectorRight: false,
  indicateInvalidDate: true,
  showDateFormatPlaceholder: false,
};

@Component({
  selector: 'date-input',
  template: `
    <my-date-picker
      [options]="myDatePickerNormalOptions"
      (dateChanged)="onDateChanged($event)"
      [selDate]="dateValue*1000 | date:'y-MM-dd'"
    ></my-date-picker>`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateInputComponent), multi: true }
  ]
})
export class DateInputComponent implements ControlValueAccessor, OnChanges {

  myDatePickerNormalOptions = myDatePickerNormalOptions;

  propagateChange: any = () => { };
  validateFn: any = () => { };

  @Input('dateValue') _dateValue = 0;
  @Input() dateRangeMax;
  @Input() dateRangeMin;

  get dateValue() {
    return this._dateValue;
  }

  set dateValue(val) {
    this._dateValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {
    if (inputs.dateRangeMax || inputs.dateRangeMin) {
      this.validateFn = createDateRangeValidator(this.dateRangeMax, this.dateRangeMin);
    }
  }

  writeValue(value) {
    if (value) {
      this.dateValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onDateChanged(event: any) {
    let date = <IMyDate>event.date;
    this.dateValue = new Date(date.year, date.month--, date.day, 8, 0, 0, 0).getTime() / 1000;
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
