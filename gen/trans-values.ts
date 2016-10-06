export const UserCashType = {
  TUserCashUnknown: '未知类型',
  TUserCashPrepay: '预付款',
  TUserCashPrepayBack: '预付款退回',
  TUserCashTrade: '交易',
  TUserCashRefund: '退款',
  TUserCashPreWithdraw: '预提现',
  TUserCashWithdraw: '提现',
  TUserCashReward: '奖励',
  TUserCashRebate: '返利',
  TUserCashStoreRebate: '返利(店铺推荐)',
  TUserCashRecharge: '充值',
};

// TODO study http://help.vipshop.com/themelist.php?type=detail&id=330
export const OrderState = {
  TOrderStateUnknown: '未知状态',
  TOrderStateNopay: '待付款',
  TOrderStatePrepaid: '支付中',
  TOrderStatePaid: '待发货',
  TOrderStateCanceled: '已关闭',
  TOrderStatePicking: '发货中',
  TOrderStateDelivered: '已发货',
  TOrderStateReturnStarted: '已申请退款',
  TOrderStateReturning: '退货中',
  TOrderStateReturned: '已退款',
  TOrderStateRejecting: '拒收货',
  TOrderStateRejectBack: '拒收已退回',
  TOrderStateRejectRefound: '拒收已退款',
  TOrderStateCompleted: '待评价',
  TOrderStateEvalStarted: '评价中',
  TOrderStateEvaled: '已评价',
  TOrderStateHistory: '已评价',
};