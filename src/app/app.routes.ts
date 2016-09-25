import { Routes, RouterModule } from '@angular/router';
import { CheckoutItemsResolver } from './app.resolver';
import { HomePageComponent } from './home';
import { NoContent } from './no-content';
import { AccountPageComponent } from './account';
import { CartListPageComponent } from './cart';
import { CategoryPageComponent } from './category';
import { FansComponent } from './fans';
import { GroupBuyPageComponent } from './group-buy';
import { HistoryComponent } from './history';
import { MemberPageComponent } from './member';
import { MemberQrComponent } from './member-qr';
import { QualificationComponent } from './qualification';
import { SearchPageComponent } from './search';
import { WeixinOauthPageComponent } from './weixin-oauth';
import { WishlistPageComponent } from './wishlist';
import { PATHS } from './core';

export const ROUTES: Routes = [

  // make sure you match the component type string to the require in asyncRoutes
  { path: 'account', component: AccountPageComponent },

  { path: 'cart', component: CartListPageComponent },
  { path: 'category', component: CategoryPageComponent },

  { path: 'fans', component: FansComponent },
  { path: 'groupbuy', component: GroupBuyPageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'member', component: MemberPageComponent },
  { path: 'member-qr', component: MemberQrComponent },

  { path: 'search', component: SearchPageComponent },

  { path: 'qualification', component: QualificationComponent },

  { path: PATHS.WX_OAUTH2_LOCAL_PATH, component: WeixinOauthPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: '**', component: NoContent },
];
