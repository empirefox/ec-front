import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { CheckoutItemsResolver } from './app.resolver';
import { HomePageComponent } from './home';
import { CartListPageComponent } from './cart';
import { NoContent } from './no-content';
import {
  ProductRouteComponent,
  ProductsPageComponent,
  ProductPageComponent,
  ProductInfoComponent,
  ProductDetailComponent,
  ProductEvalComponent,
  AddressSelectorPageComponent,
  AddressCreatorPageComponent
} from './product';
import { SearchPageComponent } from './search';
import { HistoryComponent } from './history';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: ProductRouteComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: '1/:id',
        component: ProductPageComponent,
        children: [
          {
            path: '', // info
            component: ProductInfoComponent
          },
          {
            path: 'detail',
            component: ProductDetailComponent
          },
          {
            path: 'eval',
            component: ProductEvalComponent
          }
        ]
      },
      {
        path: 'addrs',
        component: AddressSelectorPageComponent
      },
      {
        path: 'addr-creator',
        component: AddressCreatorPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      }
    ]
  },

  // make sure you match the component type string to the require in asyncRoutes
  { path: 'account', component: 'AccountPageComponent' },

  {
    path: 'addr',
    canActivate: [WebpackAsyncRoute],
    children: [
      {
        path: '', // manage
        component: 'AddressManagePageComponent'
      },
      {
        path: 'edit/:id',
        component: 'AddressEditorPageComponent',
      },
      {
        path: 'new',
        component: 'AddressEditorPageComponent',
      }
    ]
  },

  { path: 'cart', component: CartListPageComponent },
  { path: 'category', component: 'CategoryPageComponent' },

  {
    path: 'checkout',
    component: 'CheckoutRouteComponent',
    canActivate: [WebpackAsyncRoute],
    resolve: { checkoutItems: CheckoutItemsResolver },
    children: [
      {
        path: '', // content
        component: 'CheckoutContentComponent'
      },
      {
        path: 'address-selector',
        component: 'CheckoutAddrsComponent',
      },
      {
        path: 'address-creator',
        component: 'CheckoutAddrCreatorComponent',
      },
      {
        path: 'invoice',
        component: 'InvoicePageComponent',
      }
    ]
  },

  { path: 'groupbuy', component: 'GroupBuyPageComponent' },
  { path: 'history', component: HistoryComponent },
  { path: 'member', component: 'MemberPageComponent' },

  {
    path: 'order',
    component: 'OrderRouteComponent',
    canActivate: [WebpackAsyncRoute],
    children: [
      {
        path: 'list',
        component: 'OrderListComponent'
      },
      {
        path: 'detail/:id',
        component: 'OrderDetailPageComponent',
      },
      {
        path: 'delivery/:id',
        component: 'DeliveryPageComponent',
      }
    ]
  },

  {
    path: 'product',
    component: ProductRouteComponent,
    children: [
      {
        path: 'list',
        component: ProductsPageComponent
      },
      {
        path: '1/:id',
        component: ProductPageComponent,
        children: [
          {
            path: '', // info
            component: ProductInfoComponent
          },
          {
            path: 'detail',
            component: ProductDetailComponent
          },
          {
            path: 'eval',
            component: ProductEvalComponent
          }
        ]
      },
      {
        path: 'addrs',
        component: AddressSelectorPageComponent
      },
      {
        path: 'addr-creator',
        component: AddressCreatorPageComponent
      }
    ]
  },

  {
    path: 'safe',
    children: [
      {
        path: '', // safe
        component: 'SafeComponent'
      },
      {
        path: 'password',
        component: 'PasswordComponent'
      },
      {
        path: 'phone',
        component: 'BindPhoneComponent',
      },
      {
        path: 'paykey', // paykey
        component: 'PaykeyComponent',
      },
      {
        path: 'paykey-forget',
        component: 'PaykeyForgetComponent',
      },
      {
        path: 'paykey-set',
        component: 'PaykeySetComponent',
      }
    ]
  },

  { path: 'search', component: SearchPageComponent },

  {
    path: 'wallet',
    component: 'WalletRouteComponent',
    canActivate: [WebpackAsyncRoute],
    children: [
      {
        path: '', // wallet
        component: 'WalletComponent'
      },
      {
        path: 'balance', // balance
        component: 'BalanceComponent',
        children: [
          {
            path: '', // deposit
            component: 'BalanceDepositComponent'
          },
          {
            path: 'refill',
            component: 'BalanceRefillComponent'
          },
          {
            path: 'withdraw',
            component: 'BalanceWithdrawComponent'
          }
        ]
      },
      {
        path: 'points',
        component: 'PointsComponent'
      }
    ]
  },

  { path: 'weixin-oauth', component: 'WeixinOauthPageComponent' },
  { path: 'wishlist', component: 'WishlistPageComponent' },
  { path: '**', component: NoContent },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'AccountPageComponent': require('es6-promise-loader!./account'),

  'AddressManagePageComponent': require('es6-promise-loader!./address'),
  'AddressEditorPageComponent': require('es6-promise-loader!./address'),

  'CategoryPageComponent': require('es6-promise-loader!./category'),

  'CheckoutRouteComponent': require('es6-promise-loader!./checkout'),
  'CheckoutContentComponent': require('es6-promise-loader!./checkout'),
  'CheckoutAddrsComponent': require('es6-promise-loader!./checkout'),
  'CheckoutAddrCreatorComponent': require('es6-promise-loader!./checkout'),
  'InvoicePageComponent': require('es6-promise-loader!./checkout'),

  'GroupBuyPageComponent': require('es6-promise-loader!./group-buy'),
  'MemberPageComponent': require('es6-promise-loader!./member'),

  'OrderRouteComponent': require('es6-promise-loader!./order'),
  'OrderListComponent': require('es6-promise-loader!./order'),
  'OrderDetailPageComponent': require('es6-promise-loader!./order'),
  'DeliveryPageComponent': require('es6-promise-loader!./order'),

  'SafeComponent': require('es6-promise-loader!./safe'),
  'PasswordComponent': require('es6-promise-loader!./safe'),
  'BindPhoneComponent': require('es6-promise-loader!./safe'),
  'PaykeyComponent': require('es6-promise-loader!./safe'),
  'PaykeyForgetComponent': require('es6-promise-loader!./safe'),
  'PaykeySetComponent': require('es6-promise-loader!./safe'),

  'WalletRouteComponent': require('es6-promise-loader!./wallet'),
  'WalletComponent': require('es6-promise-loader!./wallet'),
  'BalanceComponent': require('es6-promise-loader!./wallet'),
  'BalanceDepositComponent': require('es6-promise-loader!./wallet'),
  'BalanceRefillComponent': require('es6-promise-loader!./wallet'),
  'BalanceWithdrawComponent': require('es6-promise-loader!./wallet'),
  'PointsComponent': require('es6-promise-loader!./wallet'),

  'WeixinOauthPageComponent': require('es6-promise-loader!./wenxin-oauth'),
  'Wishlist': require('es6-promise-loader!./wishlist'),
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['GroupBuyPageComponent'],
  // asyncRoutes['Detail'],
  // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
