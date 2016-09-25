export interface IUserCash {
  ID: number;
  OrderID: number;
  CreatedAt: number;
  Type: string;
  Amount: number;
  Remark: string;
  Balance: number;
}

export interface IUserCashFrozen {
  ID: number;
  OrderID: number;
  CreatedAt: number;
  Type: string;
  Amount: number;
  Remark: string;
  ThawedAt: number;
}

export interface IUserCashRebateItem {
  ID: number;
  RebateID: number;
  CreatedAt: number;
  Amount: number;

  rebate: IUserCashRebate; // one2manyRelate
}

export interface IUserCashRebate {
  ID: number;
  OrderID1: number;
  OrderID2: number;
  CreatedAt: number;
  Type: number;
  Amount: number;
  Remark: string;
  Stages: number;
  DoneAt: number;

  items: IUserCashRebateItem[]; // one2manyRelate
}

export interface IPointsItem {
  ID: number;
  CreatedAt: number;
  Amount: number;
  Balance: number;
  OrderID: number;
}

export interface IWallet {
  Cashes: IUserCash[]; // can be null
  Frozen: IUserCashFrozen[]; // can be null
  Rebates: IUserCashRebate[]; // can be null
  RebateItems: IUserCashRebateItem[]; // can be null
  Points: IPointsItem[]; // can be null

  cash: number;
  frozen: number;
  unrebated: number;
  points: number;
}

export interface IWxPayArgs {
  appId: string; // 公众号名称，由商户传入
  timeStamp: string; // 时间戳，自1970年以来的秒数
  nonceStr: string; // 随机串
  package: string; // "prepay_id=u802345jgfjsdfgsdg888"
  signType: string; // 微信签名方式
  paySign: string; // 微信签名
}

export interface WithdrawPayload {
  Amount: number;
}

// from user-vip
export interface VipRebatePayload {
  Type: number;
  SubIDs: number[];
}
