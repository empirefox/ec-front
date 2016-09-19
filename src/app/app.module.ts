import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { AddressModule } from './address';
import { CartModule } from './cart';
import { CategoryModule } from './category';
import { CheckoutModule } from './checkout';
import { CheyouModule } from './cheyou';
import { FooterBarModule } from './footer-bar';
import { GroupbuyModule } from './group-buy';
import { HeaderBarModule } from './header-bar';
import { HomeModule } from './home';
import { MemberModule } from './member';
import { NavMenuListModule } from './nav-menu-list';
import { OrderModule } from './order';
import { PayModule } from './pay';
import { ProductModule } from './product';
import { QuantityInputModule } from './quantity-input';
import { RatingModule } from './rating';
import { SafeModule } from './safe';
import { SearchModule } from './search';
import { WalletModule } from './wallet';

import { AccountPageComponent } from './account';
import { FansComponent } from './fans';
import { HistoryComponent } from './history';
import { MemberQrComponent } from './member-qr';
import { NoContent } from './no-content';
import { WeixinOauthPageComponent } from './weixin-oauth';
import { WishlistPageComponent } from './wishlist';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { CoreModule } from './core.module';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    AccountPageComponent,
    FansComponent,
    HistoryComponent,
    MemberQrComponent,
    NoContent,
    WeixinOauthPageComponent,
    WishlistPageComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    CoreModule,

    AddressModule,
    CartModule,
    CategoryModule,
    CheckoutModule,
    CheyouModule,
    FooterBarModule,
    GroupbuyModule,
    HeaderBarModule,
    HomeModule,
    MemberModule,
    NavMenuListModule,
    OrderModule,
    PayModule,
    ProductModule,
    QuantityInputModule,
    RatingModule,
    SafeModule,
    SearchModule,
    WalletModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
