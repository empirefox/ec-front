import { Pipe, PipeTransform } from '@angular/core';
import { ConstMap } from '../consts';

const State = ConstMap.OrderState;

// TODO study http://help.vipshop.com/themelist.php?type=detail&id=330
const STATES = {
  [State["TOrderStateUnknown"]]: "未知状态",
  [State["TOrderStateNopay"]]: "待付款",
  [State["TOrderStatePrepaid"]]: "支付中",
  [State["TOrderStatePaid"]]: "待发货",
  [State["TOrderStateCanceled"]]: "已关闭",
  [State["TOrderStatePicking"]]: "发货中",
  [State["TOrderStateDelivered"]]: "已发货",
  [State["TOrderStateReturnStarted"]]: "已申请退款",
  [State["TOrderStateReturning"]]: "退货中",
  [State["TOrderStateReturned"]]: "已退款",
  [State["TOrderStateRejecting"]]: "拒收货",
  [State["TOrderStateRejectBack"]]: "拒收已退回",
  [State["TOrderStateRejectRefound"]]: "拒收已退款",
  [State["TOrderStateCompleted"]]: "待评价",
  [State["TOrderStateEvalStarted"]]: "评价中",
  [State["TOrderStateEvaled"]]: "已评价",
  [State["TOrderStateHistory"]]: "已评价",
};

@Pipe({ name: 'orderState' })
export class OrderStatePipe implements PipeTransform {
  transform(value: string) {
    return STATES[value] ? STATES[value] : '';
  }
}
