import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'money' })
export class MoneyPipe extends DecimalPipe {
  transform(value: number) {
    return super.transform((value ? value : 0) / 100, '1.2-2');
  }
}

@Pipe({ name: 'yuan' })
export class YuanPipe extends DecimalPipe {
  transform(value: number) {
    return super.transform((value ? value : 0) / 100, '1.2-2').slice(0, -3);
  }
}

@Pipe({ name: 'cent' })
export class CentPipe extends DecimalPipe {
  transform(value: number) {
    return super.transform((value ? value : 0) / 100, '1.2-2').slice(-3);
  }
}
