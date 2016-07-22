import {JWT_CONFIG, PUBLIC_URL, API_URL, XSTORAGE_HUB_URL} from '../share';

export * from '../share';

export interface IProfile {
  FreeDeliverLine: number;
  Phone: string;
  WxAppId: string;
  WxScope: string;
  WxLoginPath: string;
}

export const PATHS = {
  WX_OAUTH2_LOCAL_PATH: `/oauth/weixin`,
};

export let URLS = {
  PROFILE: `${API_URL}/profile`,

  CAPTHCA: `${API_URL}/captcha`,
  CAROUSEL: `${API_URL}/carousel`,

  UserRefreshToken: (refreshToken: string) => `${API_URL}/oauth/update/${refreshToken}`,
  UserPreBindPhone: (phone: string) => `${API_URL}/prebind_phone/${phone}`,
  USER_BIND_PHONE: `${API_URL}/bind_phone`,
  USER_INFO: `${API_URL}/userinfo`,

  WISH_LIST: `${API_URL}/wishlist`,
  WISH_LIST_ADD: `${API_URL}/wishlist_add`,
  WishItem: (id: number) => `${API_URL}/wishlist/${id}`,

  MONEY_BALANCE: `${API_URL}/balance`,
  TradeState: (id: string) => `${API_URL}/prepay/${id}`,

  ORDER_LIST: `${API_URL}/cart`,
  ORDER_CHECKOUT: `${API_URL}/checkout`,
  ORDER_CANCEL: `${API_URL}/order_cancel`,
  ORDER_PAY: `${API_URL}/order_pay`,
  ORDER_WX_PAY: `${API_URL}/order_wx_pay`,
  Order: (id: number) => `${API_URL}/order/${id}`,

  CART_LIST: `${API_URL}/cart`,
  CART_ADD: `${API_URL}/cart_item`,
  CART_SET_QUANTITY: `${API_URL}/cart_item_quantity`,
  Cart: (id: number) => `${API_URL}/cart/${id}`,

  CATEGORY_LIST: `${API_URL}/categoryies`,

  PRODUCT_LIST: `${API_URL}/products`,
  PRODUCT_GROUP_LIST: `${API_URL}/products/groups`,
  Product: (id: number) => `${API_URL}/product/${id}`,
  PRODUCT_ATTR_LIST: `${API_URL}/product_attrs`,
  PRODUCT_ATTR_GROUP_LIST: `${API_URL}/product_attr_groups`,

  GROUP_BUY: `${API_URL}/groupbuy`,
  GroupBuyItem: (id: number) => `${API_URL}/groupbuy/${id}`,

  ADDR_LIST: `${API_URL}/addrs`,
  ADDR_ADD: `${API_URL}/addr`,
  Addr: (id: number) => `${API_URL}/addr/${id}`,

  COUPON_LIST: `${API_URL}/coupons`,

  Delivery: (orderId: number) => `${API_URL}/delivery/${orderId}`,

  XSTORAGE_HUB_URL: XSTORAGE_HUB_URL,

};
