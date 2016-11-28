import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'angular2-modal';
import { appRoutes } from './app.routes';
import { CoreModule } from './core.module';

import { AppComponent } from './app.component';
import { AddressModule } from './address';
import { CartModule } from './cart';
import { CategoryModule } from './category';
import { CheckoutModule } from './checkout';
import { CheyouModule } from './cheyou';
import { GroupbuyModule } from './group-buy';
import { HomeModule } from './home';
import { MemberModule } from './member';
import { NewsModule } from './news';
import { OrderModule } from './order';
import { ProductModule } from './product';
import { SafeModule } from './safe';
import { WalletModule } from './wallet';

import { FansComponent } from './fans';
import { HistoryComponent } from './history';
import { MemberQrComponent } from './member-qr';
import { NoContent } from './no-content';
import { QualificationComponent } from './qualification';
import { SearchPageComponent } from './search';
import { WeixinOauthPageComponent } from './weixin-oauth';
import { WishlistPageComponent } from './wishlist';

import { APP_CORE_PROVIDERS } from './core';

@NgModule({
  declarations: [
    AppComponent,
    FansComponent,
    HistoryComponent,
    MemberQrComponent,
    NoContent,
    QualificationComponent,
    SearchPageComponent,
    WeixinOauthPageComponent,
    WishlistPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    CoreModule,

    AddressModule,
    CartModule,
    CategoryModule,
    CheckoutModule,
    CheyouModule,
    GroupbuyModule,
    HomeModule,
    MemberModule,
    NewsModule,
    OrderModule,
    ProductModule,
    SafeModule,
    WalletModule,
  ],
  providers: [
    ...APP_CORE_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
