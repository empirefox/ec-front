import { Routes, RouterModule } from '@angular/router';
import { CheckoutItemsResolver } from './app.resolver';
import { HomePageComponent } from './home';
import { NoContent } from './no-content';
import { AccountPageComponent } from './account';
import { CartListPageComponent } from './cart';
import { CategoryPageComponent } from './category';
import { GroupBuyPageComponent } from './group-buy';
import { HistoryComponent } from './history';
import { MemberPageComponent } from './member';
import { MemberQrComponent } from './member-qr';
import {
  OrderRouteComponent,
  OrderListComponent,
  OrderEvalComponent,
  OrderDetailPageComponent,
  DeliveryPageComponent,
} from './order';
import {
  ProductRouteComponent,
  ProductsPageComponent,
  ProductPageComponent,
  ProductInfoComponent,
  ProductDetailComponent,
  ProductEvalComponent,
  AddressSelectorPageComponent,
  AddressCreatorPageComponent,
} from './product';
import {
  SafeComponent,
  PasswordComponent,
  BindPhoneComponent,
  PaykeyComponent,
  PaykeyForgetComponent,
  PaykeySetComponent,
} from './safe';
import { SearchPageComponent } from './search';
import {
  WalletRouteComponent,
  WalletComponent,
  BalanceComponent,
  BalanceDepositComponent,
  BalanceRefillComponent,
  BalanceWithdrawComponent,
  PointsComponent,
  RewardComponent,
} from './wallet';
import { WeixinOauthPageComponent } from './weixin-oauth';
import { WishlistPageComponent } from './wishlist';
import { PATHS } from './core';

export const ROUTES: Routes = [

  // make sure you match the component type string to the require in asyncRoutes
  { path: 'account', component: AccountPageComponent },

  { path: 'cart', component: CartListPageComponent },
  { path: 'category', component: CategoryPageComponent },

  { path: 'groupbuy', component: GroupBuyPageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'member', component: MemberPageComponent },
  { path: 'member-qr', component: MemberQrComponent },

  { path: 'search', component: SearchPageComponent },

  { path: PATHS.WX_OAUTH2_LOCAL_PATH, component: WeixinOauthPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: '**', component: NoContent },
];
