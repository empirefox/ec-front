import { Pipe, PipeTransform } from '@angular/core';
import { constMap } from '../consts';

const state = constMap.UserCashType;

const STATES = {
  [state.TUserCashUnknown]: '未知类型',
  [state.TUserCashPrepay]: '预付款',
  [state.TUserCashPrepayBack]: '预付款退回',
  [state.TUserCashTrade]: '交易',
  [state.TUserCashRefund]: '退款',
  [state.TUserCashPreWithdraw]: '预提现',
  [state.TUserCashWithdraw]: '提现',
  [state.TUserCashReward]: '奖励',
  [state.TUserCashRebate]: '返利',
  [state.TUserCashStoreRebate]: '返利(店铺推荐)',
};

if (Object.keys(STATES).length !== Object.keys(state).length) {
  console.error('UserCashType is dirt');
}

@Pipe({ name: 'cashType' })
export class CashTypePipe implements PipeTransform {
  transform(value: number) {
    return STATES[value] ? STATES[value] : '';
  }
}
