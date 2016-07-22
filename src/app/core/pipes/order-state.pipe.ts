import { Pipe, PipeTransform } from '@angular/core';

const STATES = {
  checkout: '待付款',
  cancelled: '已关闭',
  paied: '待发货',
  paid_cancelled: '已关闭',
  delivered: '待收货',
  reciepted: '交易成功',
  returned: '已退货',
};

@Pipe({ name: 'orderState' })
export class OrderStatePipe implements PipeTransform {
  transform(value: string) {
    return STATES[value] ? STATES[value] : '';
  }
}
