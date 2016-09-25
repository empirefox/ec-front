import { JWT_CONFIG, PUBLIC_URL, API_URL, XSTORAGE_HUB_URL } from '../share';

export * from '../share';

export interface IProfile {
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
}

export const PATHS = {
  WX_OAUTH2_LOCAL_PATH: `oauth/weixin`,
};

export const URLS = {
  PROFILE: `${API_URL}/profile`, // get

  CAPTHCA: `${API_URL}/captcha`, // get
  CAROUSEL: `${API_URL}/carousel`, // get
  NEWS: `${API_URL}/news`, // get
  VIPS: `${API_URL}/vips`, // get

  MY_VIPS: `${API_URL}/myvips`, // get
  QUALIFICATIONS: `${API_URL}/myqualifications`, // get
  FANS: `${API_URL}/myfans`, // get

  UserRefreshToken: (refreshToken: string) => `${API_URL}/refresh_token/${refreshToken}`, // get
  USER_SET_INFO: `${API_URL}/set_user_info`, // post
  USER_PREBIND_PHONE: `${API_URL}/phone/prebind`, // post
  USER_BIND_PHONE: `${API_URL}/phone/bind`, // post
  USER_PAYKEY_PRESET: `${API_URL}/paykey/preset`, // get
  USER_PAYKEY_SET: `${API_URL}/paykey/set`, // post
  USER_REBATE: `${API_URL}/rebate`, // post
  USER_WITHDRAW: `${API_URL}/withdraw`, // post

  WISH_LIST: `${API_URL}/wishlist`, // get
  WISH_LIST_ADD: `${API_URL}/wishlist_add`, // post
  WishItem: (id: number) => `${API_URL}/wishlist/${id}`, // get delete

  WALLET: `${API_URL}/wallet`,
  // TradeState: (id: string) => `${API_URL}/prepay/${id}`,

  ORDER_LIST: `${API_URL}/orders`, // get
  ORDER_CHECKOUT: `${API_URL}/checkout`, // post
  ORDER_PAY: `${API_URL}/order_pay`, // post
  ORDER_WX_PAY: `${API_URL}/order_wx_pay`, // post
  Order: (id: number) => `${API_URL}/order/${id}`, // get
  ORDER_STATE: `${API_URL}/order_state`, // post
  PaiedOrder: (id: number) => `${API_URL}/paied_order/${id}`, // get

  OrderEval: (orderItemId: number) => `${API_URL}/eval/${orderItemId}`, // post
  ProductEvals: (productId: number) => `${API_URL}/evals/${productId}`, // get

  CART_LIST: `${API_URL}/cart`, // get post
  CART_ADD: `${API_URL}/cart_item`, // post
  CART_SET_QUANTITY: `${API_URL}/cart_item_quantity`, // post
  Cart: (id: number) => `${API_URL}/cart/${id}`, // delete

  CATEGORY_LIST: `${API_URL}/category`, // get

  PRODUCT_LIST: `${API_URL}/product/ls`, // get
  // PRODUCT_GROUP_LIST: `${API_URL}/products/groups`, // get
  Product: (id: number) => `${API_URL}/product/1/${id}`, // get
  PRODUCT_ATTR_LIST: `${API_URL}/product/attrs`, // get
  // PRODUCT_ATTR_GROUP_LIST: `${API_URL}/product_attr_groups`, // get

  GROUP_BUY: `${API_URL}/groupbuy`, // get
  // GroupBuyItem: (id: number) => `${API_URL}/groupbuy/${id}`,

  ADDR_LIST: `${API_URL}/addrs`, // get
  ADDR_ADD: `${API_URL}/addr`,  // post
  Addr: (id: number) => `${API_URL}/addr/${id}`, // delete

  COUPON_LIST: `${API_URL}/coupons`,

  Delivery: (orderId: number) => `${API_URL}/delivery/${orderId}`, // get from kuaidi100

  XSTORAGE_HUB_URL: XSTORAGE_HUB_URL,

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
