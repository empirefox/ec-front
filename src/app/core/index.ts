import { Provider } from '@angular/core';

import { ADDR_PROVIDERS } from './address';
import { CAPTCHA_PROVIDERS } from './captcha';
import { CAROUSEL_PROVIDERS } from './carousel';
import { CART_PROVIDERS } from './cart';
import { CATEGORY_PROVIDERS } from './category';
import { CDN_PROVIDERS } from './cdn';
import { COUNTDOWN_PROVIDERS } from './countdown';
import { DELIVERY_PROVIDERS } from './delivery';
import { FANS_PROVIDERS } from './fans';
import { GROUPBUY_PROVIDERS } from './groupbuy';
import { HISTORY_PROVIDERS } from './history';
import { JWT_PROVIDERS } from './jwt';
import { MODALS_PROVIDERS } from './modal';
import { MONEY_PROVIDERS } from './money';
import { NEWS_PROVIDERS } from './news';
import { ORDER_PROVIDERS } from './order';
import { PRODUCT_PROVIDERS } from './product';
import { PROFILE_PROVIDERS } from './profile';
import { SEARCH_PROVIDERS } from './search';
import { STORE_PROVIDERS } from './store';
import { USER_PROVIDERS } from './user';
import { VIP_PROVIDERS } from './vip';
import { WISHLIST_PROVIDERS } from './wishlist';
import { QR_PROVIDERS } from './qr';

export { IAddress, AddressService, AddressResolver } from './address';
export { ICaptcha, CaptchaService } from './captcha';
export { ICarouselItem, CarouselService } from './carousel';
export { ICartItem, ICartItemContent, CartService } from './cart';
export { ICategory, CategoryService } from './category';
export { CdnService, HeadUptoken, IQiniuItem } from './cdn';
export { CountdownService } from './countdown';
export { IDelivery, IDeliveryDay, IDeliveryItem, DeliveryService } from './delivery';
export { IFan, FansService, FansResolver } from './fans';
export { IGroupBuyItem, GroupBuy, GroupBuyService } from './groupbuy';
export { HistoryItem, HistoryService } from './history';
export { JwtService } from './jwt';
export { ModalService } from './modal';
export {
  IPointsItem, IUserCashFrozen, IUserCash, IUserCashRebate, IUserCashRebateItem, IWallet, IWxPayArgs,
  VipRebatePayload, WithdrawPayload, MoneyService, LocalWalletBase, WalletResolver,
} from './money';
export { INewsItem, INewsQuery, NewsService } from './news';
export {
  ICheckout, ICheckoutItem, ICheckoutOnePayload, ICheckoutPayload, ICheckoutPayloadItem, IOrderChangeStatePayload,
  IInvoice, Invoice, IOrder, IOrderAddress, IOrderItem, IOrderPayPayload, IOrderWxPayPayload,
  OrderService, OrderResolver, LocalCheckoutBase,
} from './order';
export {
  IEvalItem, IProduct, IProductAttr, IProductAttrGroup, IProductAttrId, IProductEval, IProductQuery, IProductRawInfo,
  ProductAttr, ProductAttrs, ProductAttrGroup, ProductBase, ProductService, ISku, ISpecial,
  LocalProductBase, LocalProductService, LocalProductServiceFactory,
} from './product';
export { CommonQuery, JwtConfig, WxCodeResult, IProfile, config, URLS, ProfileResolver, ProfileService } from './profile';
export { QrService } from './qr';
export { SearchService } from './search';
export { IStore, StoreService, StoreResolver, } from './store';
export {
  IUserInfo, ISetUserInfoPayload, UserService, UserResolver, userTrans, TokenService,
  ExchangePayload, ISetPaykeyPayload, IBindPhonePayload, IPreBindPhonePayload, RetryHttp,
} from './user';
export {
  provideParent, idSortor, posSortor, createdAtSortor, updateAfterSave, nonce,
  toURLSearchParams, removeURLParameter, one2manyRelate, splitToParents,
} from './util';
export { IVipIntro, IVipName, IVipRebateOrigin, MyVips, VipService } from './vip';
export { IWishItem, IWishlistSavePayload, WishlistService } from './wishlist';
export { APP_CORE_PIPES } from './pipes';
export { consts, constMap, constTransMap } from './consts';

export const APP_CORE_PROVIDERS: Provider[] = [
  ...ADDR_PROVIDERS,
  ...CAPTCHA_PROVIDERS,
  ...CAROUSEL_PROVIDERS,
  ...CART_PROVIDERS,
  ...CATEGORY_PROVIDERS,
  ...CDN_PROVIDERS,
  ...COUNTDOWN_PROVIDERS,
  ...DELIVERY_PROVIDERS,
  ...FANS_PROVIDERS,
  ...GROUPBUY_PROVIDERS,
  ...HISTORY_PROVIDERS,
  ...JWT_PROVIDERS,
  ...MODALS_PROVIDERS,
  ...MONEY_PROVIDERS,
  ...NEWS_PROVIDERS,
  ...ORDER_PROVIDERS,
  ...PRODUCT_PROVIDERS,
  ...PROFILE_PROVIDERS,
  ...QR_PROVIDERS,
  ...SEARCH_PROVIDERS,
  ...STORE_PROVIDERS,
  ...USER_PROVIDERS,
  ...VIP_PROVIDERS,
  ...WISHLIST_PROVIDERS,
];
