import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isNumber } from '@angular/core/src/facade/lang';

const Timeago = require("timeago.js");

@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
  base = new Timeago(null, 'zh_CN'); // not zh-CN
  transform(value: Date | number) {
    return isNumber(value) ? this.base.format(<number>value * 1000) : this.base.format(value);
  }
}
