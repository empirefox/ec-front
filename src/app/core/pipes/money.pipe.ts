import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { constMap } from '../consts';
import { ISku } from '../product';

@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
  base = new DecimalPipe('zh-CN');
  transform(sku: ISku) {
    if (sku.product.Vpn === constMap.VpnType['TVpnPoints']) {
      return `${sku.SalePrice}积分`;
    }
    return `￥${this.base.transform(sku.SalePrice / 100, '1.2-2')}`;
  }
}

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  base = new DecimalPipe('zh-CN');
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2');
  }
}

@Pipe({ name: 'yuan' })
export class YuanPipe implements PipeTransform {
  base = new DecimalPipe('zh-CN');
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2').slice(0, -3);
  }
}

@Pipe({ name: 'cent' })
export class CentPipe implements PipeTransform {
  base = new DecimalPipe('zh-CN');
  transform(value: number) {
    return this.base.transform((value ? value : 0) / 100, '1.2-2').slice(-3);
  }
}
