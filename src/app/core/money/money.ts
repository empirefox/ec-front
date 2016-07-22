export interface ICapitalFlow {
  ID: number;
  CreatedAt: number;
  Type: string;
  Reason: string;
  Amount: number;
  Balance: number;
}

export interface IPointsItem {
  ID: number;
  CreatedAt: number;
  Reason: string;
  Amount: number;
  Balance: number;
}

export interface IWallet {
  Deposit: number;
  HasPayKey: boolean;
  Points: number;
  CapitalFlows: ICapitalFlow[];
  PointsList: IPointsItem[];
}

export interface IPayArgs {
  OrderID: string;

  appId: string; // 公众号名称，由商户传入
  timeStamp: string; // 时间戳，自1970年以来的秒数
  nonceStr: string; // 随机串
  package: string; // "prepay_id=u802345jgfjsdfgsdg888"
  signType: string; // 微信签名方式
  paySign: string; // 微信签名
}

// Deprecated
export interface ITradeState {
  // SUCCESS REFUND NOTPAY CLOSED REVOKED USERPAYING PAYERROR
  TradeState: string;
}
