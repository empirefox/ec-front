import { Routes } from '@angular/router';
import { NoContent } from './no-content';
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
import { ProfileResolver, UserResolver, WalletResolver, FansResolver } from './core';

export const appRoutes: Routes = [

  // make sure you match the component type string to the require in asyncRoutes
  { path: 'cart', component: CartListPageComponent },
  { path: 'category', component: CategoryPageComponent },

  {
    path: 'fans',
    component: FansComponent,
    resolve: {
      profile: ProfileResolver,
      fans: FansResolver,
    },
  },
  { path: 'groupbuy', component: GroupBuyPageComponent },
  { path: 'history', component: HistoryComponent },
  {
    path: 'member',
    component: MemberPageComponent,
    resolve: {
      profile: ProfileResolver,
      user: UserResolver,
      wallet: WalletResolver,
    },
  },
  { path: 'member-qr', component: MemberQrComponent },

  { path: 'search', component: SearchPageComponent },

  {
    path: 'qualification',
    component: QualificationComponent,
    resolve: {
      profile: ProfileResolver,
    },
  },

  { path: 'oauth/weixin', component: WeixinOauthPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: '**', component: NoContent },
];
