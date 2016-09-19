import { JWT_CONFIG, PUBLIC_URL, API_URL, XSTORAGE_HUB_URL } from '../share';

export * from '../share';

export interface IProfile {
  FreeDeliverLine: number;
  Phone: string;
  WxAppId: string;
  WxScope: string;
  WxLoginPath: string;
  DefaultHeadImage: string;
  QrLogoUrl: string; // TODO add to backend
}

export const PATHS = {
  WX_OAUTH2_LOCAL_PATH: `oauth/weixin`,
};

export let URLS = {
  PROFILE: `${API_URL}/profile`, // get

  CAPTHCA: `${API_URL}/captcha`, // post
  CAROUSEL: `${API_URL}/carousel`, // get

  UserRefreshToken: (refreshToken: string) => `${API_URL}/oauth/update/${refreshToken}`, // get
  UserPreBindPhone: (phone: string) => `${API_URL}/prebind_phone/${phone}`, // get
  USER_BIND_PHONE: `${API_URL}/bind_phone`, // post
  USER_INFO: `${API_URL}/userinfo`, // get

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

  OrderEval: (orderItemId: number) => `${API_URL}/eval/${orderItemId}`, // post
  OrderEvals: (orderId: number) => `${API_URL}/evals/${orderId}`, // post
  ProductEvals: (productId: number) => `${API_URL}/evals/${productId}`, // get

  CART_LIST: `${API_URL}/cart`, // get
  CART_ADD: `${API_URL}/cart_item`, // post
  CART_SET_QUANTITY: `${API_URL}/cart_item_quantity`, // post
  Cart: (id: number) => `${API_URL}/cart/${id}`, // delete

  CATEGORY_LIST: `${API_URL}/category`, // get

  PRODUCT_LIST: `${API_URL}/products`, // get
  // PRODUCT_GROUP_LIST: `${API_URL}/products/groups`, // get
  Product: (id: number) => `${API_URL}/product/${id}`, // get
  PRODUCT_ATTR_LIST: `${API_URL}/product_attrs`, // get
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
