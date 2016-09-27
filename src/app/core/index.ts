import { ADDR_PROVIDERS } from './address';
import { CAPTCHA_PROVIDERS } from './captcha';
import { CAROUSEL_PROVIDERS } from './carousel';
import { CART_PROVIDERS } from './cart';
import { CATEGORY_PROVIDERS } from './category';
import { COUNTDOWN_PROVIDERS } from './countdown';
// import { COUPON_PROVIDERS } from './coupon';
import { DELIVERY_PROVIDERS } from './delivery';
import { FANS_PROVIDERS } from './fans';
import { GROUPBUY_PROVIDERS } from './groupbuy';
import { HISTORY_PROVIDERS } from './history';
import { JWT_PROVIDERS } from './jwt';
// import { LocalPublishService } from './local-publish';
import { LOCALDB_PROVIDERS } from './localdb';
import { MONEY_PROVIDERS } from './money';
import { NEWS_PROVIDERS } from './news';
import { ORDER_PROVIDERS } from './order';
import { PRODUCT_PROVIDERS } from './product';
import { PROFILE_PROVIDERS } from './profile';
import { SEARCH_PROVIDERS } from './search';
import { USER_PROVIDERS } from './user';
import { VIP_PROVIDERS } from './vip';
import { WISHLIST_PROVIDERS } from './wishlist';
import { QR_PROVIDERS } from './qr';
// import { XSTORAGE_PROVIDERS } from './xstorage';

export * from './address';
export * from './captcha';
export * from './carousel';
export * from './cart';
export * from './category';
export * from './countdown';
// export * from './coupon';
export * from './delivery';
export * from './fans';
export * from './groupbuy';
export * from './history';
export * from './jwt';
export * from './local-publish';
export * from './localdb';
export * from './money';
export * from './news';
export * from './order';
export * from './product';
export * from './profile';
export * from './qr';
export * from './search';
export * from './user';
export * from './util';
export * from './vip';
export * from './wishlist';
// export * from './xstorage';
export { APP_CORE_PIPES } from './pipes';
export * from './consts';

export const APP_CORE_PROVIDERS = [
  ...ADDR_PROVIDERS,
  ...CAPTCHA_PROVIDERS,
  ...CAROUSEL_PROVIDERS,
  ...CART_PROVIDERS,
  ...CATEGORY_PROVIDERS,
  ...COUNTDOWN_PROVIDERS,
  //  ...COUPON_PROVIDERS ,
  ...DELIVERY_PROVIDERS,
  ...FANS_PROVIDERS,
  ...GROUPBUY_PROVIDERS,
  ...HISTORY_PROVIDERS,
  ...JWT_PROVIDERS,
  //  LocalPublishService,
  ...LOCALDB_PROVIDERS,
  ...MONEY_PROVIDERS,
  ...NEWS_PROVIDERS,
  ...ORDER_PROVIDERS,
  ...PRODUCT_PROVIDERS,
  ...PROFILE_PROVIDERS,
  ...QR_PROVIDERS,
  ...SEARCH_PROVIDERS,
  ...USER_PROVIDERS,
  ...VIP_PROVIDERS,
  ...WISHLIST_PROVIDERS,
  //  ...XSTORAGE_PROVIDERS,
];
