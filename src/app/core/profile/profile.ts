export interface IProfile {
  OfficialStoreName: string;
  WxMpName: string;
  Phone: string;
  DefaultHeadImage: string;
  IntroVipDetail: string;
  IntroVipPrivilege: string;
  IntroCarInsurance: string;

  WxAppId: string;
  WxScope: string;
  WxLoginPath: string;

  RewardFromVipCent: number;

  EvalTimeoutDay: number;
  CompleteTimeoutDay: number;
  HistoryTimeoutDay: number;
  CheckoutExpiresMinute: number;
  WxPayExpiresMinute: number;
  FreeDeliverLine: number;

  HeadPrefix: string;
}

export interface CommonQuery {
  q?: string; // query
  sp?: string; // scope
  ft?: string; // filter
  st?: number; // start
  sz?: number; // size
  tl?: number; // total
  ob?: string; // orderBy
}
