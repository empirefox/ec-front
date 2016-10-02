import { Pipe, PipeTransform } from '@angular/core';
import { constMap } from '../consts';

const state = constMap.OrderState;

// TODO study http://help.vipshop.com/themelist.php?type=detail&id=330
const STATES = {
  [state.TOrderStateUnknown]: "未知状态",
  [state.TOrderStateNopay]: "待付款",
  [state.TOrderStatePrepaid]: "支付中",
  [state.TOrderStatePaid]: "待发货",
  [state.TOrderStateCanceled]: "已关闭",
  [state.TOrderStatePicking]: "发货中",
  [state.TOrderStateDelivered]: "已发货",
  [state.TOrderStateReturnStarted]: "已申请退款",
  [state.TOrderStateReturning]: "退货中",
  [state.TOrderStateReturned]: "已退款",
  [state.TOrderStateRejecting]: "拒收货",
  [state.TOrderStateRejectBack]: "拒收已退回",
  [state.TOrderStateRejectRefound]: "拒收已退款",
  [state.TOrderStateCompleted]: "待评价",
  [state.TOrderStateEvalStarted]: "评价中",
  [state.TOrderStateEvaled]: "已评价",
  [state.TOrderStateHistory]: "已评价",
};

if (Object.keys(STATES).length !== Object.keys(state).length) {
  console.error('OrderState is dirt');
}

@Pipe({ name: 'orderState' })
export class OrderStatePipe implements PipeTransform {
  transform(value: number) {
    return STATES[value] ? STATES[value] : '';
  }
}
