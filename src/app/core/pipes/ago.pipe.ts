import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

const Timeago = require("timeago.js");

@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
  base = new Timeago(null, 'zh_CN'); // not zh-CN
  transform(value) {
    return this.base.format(value);
  }
}
