import { config } from '../share';

export * from '../share';

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

export const URLS = {
  PROFILE: `${config.apiOrigin}/profile`, // get

  FAKE_TOKEN: `${config.apiOrigin}/faketoken`, // get
  HEAD_UPTOKEN: `${config.apiOrigin}/headtoken`, // get

  CAPTHCA: `${config.apiOrigin}/captcha`, // get
  CAROUSEL: `${config.apiOrigin}/carousel`, // get
  STORE: `${config.apiOrigin}/store`, // get
  NEWS: `${config.apiOrigin}/news`, // get
  NewsItem: (id: number) => `${config.apiOrigin}/news/1/${id}`, // get
  VIPS: `${config.apiOrigin}/vips`, // get

  MY_VIPS: `${config.apiOrigin}/myvips`, // get
  QUALIFICATIONS: `${config.apiOrigin}/myqualifications`, // get
  FANS: `${config.apiOrigin}/myfans`, // get

  UserRefreshToken: (refreshToken: string) => `${config.apiOrigin}/refresh_token/${refreshToken}`, // get
  USER_SET_INFO: `${config.apiOrigin}/set_user_info`, // post
  USER_PREBIND_PHONE: `${config.apiOrigin}/phone/prebind`, // post
  USER_BIND_PHONE: `${config.apiOrigin}/phone/bind`, // post
  USER_PAYKEY_PRESET: `${config.apiOrigin}/paykey/preset`, // get
  USER_PAYKEY_SET: `${config.apiOrigin}/paykey/set`, // post
  USER_REBATE: `${config.apiOrigin}/rebate`, // post
  USER_WITHDRAW: `${config.apiOrigin}/withdraw`, // post

  WISH_LIST_ALL: `${config.apiOrigin}/wishlist`, // get

  WALLET: `${config.apiOrigin}/wallet`,
  // TradeState: (id: string) => `${config.apiOrigin}/prepay/${id}`,

  ORDER_LIST: `${config.apiOrigin}/orders`, // get
  ORDER_CHECKOUT: `${config.apiOrigin}/checkout`, // post
  ORDER_CHECKOUT_ONE: `${config.apiOrigin}/checkout_one`, // post
  ORDER_PAY: `${config.apiOrigin}/order_pay`, // post
  ORDER_WX_PAY: `${config.apiOrigin}/order_wx_pay`, // post
  Order: (id: number) => `${config.apiOrigin}/order/${id}`, // get
  ORDER_STATE: `${config.apiOrigin}/order_state`, // post
  PaiedOrder: (id: number) => `${config.apiOrigin}/paied_order/${id}`, // get

  OrderEval: (orderItemId: number) => `${config.apiOrigin}/eval/${orderItemId}`, // post
  ProductEvals: (productId: number) => `${config.apiOrigin}/evals/${productId}`, // get

  CART_ALL: `${config.apiOrigin}/cart`, // get post delete

  CATEGORY_LIST: `${config.apiOrigin}/category`, // get

  ProductSkus: (id: number) => `${config.apiOrigin}/product/skus/${id}`, // get
  PRODUCT_LIST: `${config.apiOrigin}/product/ls`, // get
  // PRODUCT_GROUP_LIST: `${config.apiOrigin}/products/groups`, // get
  Product: (id: number) => `${config.apiOrigin}/product/1/${id}`, // get
  PRODUCT_ATTR_LIST: `${config.apiOrigin}/product/attrs`, // get
  // PRODUCT_ATTR_GROUP_LIST: `${config.apiOrigin}/product_attr_groups`, // get

  GROUP_BUY: `${config.apiOrigin}/groupbuy`, // get
  // GroupBuyItem: (id: number) => `${config.apiOrigin}/groupbuy/${id}`,

  ADDR_LIST: `${config.apiOrigin}/addrs`, // get
  ADDR_ADD: `${config.apiOrigin}/addr`,  // post
  Addr: (id: number) => `${config.apiOrigin}/addr/${id}`, // delete

  COUPON_LIST: `${config.apiOrigin}/coupons`,

  Delivery: (orderId: number) => `${config.apiOrigin}/delivery/${orderId}`, // get from kuaidi100

  XSTORAGE_HUB_URL: config.xstorageHubUrl,

  // locals
  WX_OAUTH2_LOCAL: `${config.publicOrigin}/oauth/weixin`,
  WX_OAUTH2_LOCAL_PATH: `oauth/weixin`,
};

export interface CommonQuery {
  q?: string; // query
  sp?: string; // scope
  ft?: string; // filter
  st?: number; // start
  sz?: number; // size
  tl?: number; // total
  ob?: string; // orderBy
}
