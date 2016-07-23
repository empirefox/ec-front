import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  base = new DecimalPipe();
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2');
  }
}

@Pipe({ name: 'yuan' })
export class YuanPipe implements PipeTransform {
  base = new DecimalPipe();
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2').slice(0, -3);
  }
}

@Pipe({ name: 'cent' })
export class CentPipe implements PipeTransform {
  base = new DecimalPipe();
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2').slice(-3);
  }
}
