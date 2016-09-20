import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { KSSwiperModule } from 'angular2-swiper';

import { NavMenuListComponent } from './nav-menu-list';
import { HeaderBarComponent, Header1InnerComponent, Header1Component } from './header-bar';
import { FooterBarComponent } from './footer-bar';

import { HomePageComponent } from './home';
import { NoContent } from './no-content';
import { AccountPageComponent } from './account';
import { AddressManagePageComponent, AddressEditorPageComponent } from './address';
import { CartListPageComponent } from './cart';
import { CategoryPageComponent } from './category';
import {
  CheckoutRouteComponent,
  CheckoutContentComponent,
  CheckoutAddrsComponent,
  CheckoutAddrCreatorComponent,
  InvoicePageComponent,
} from './checkout';
import {
  CheyouHubComponent,
  CheyouDetailComponent,
  CheyouBuyComponent,
  CheyouListComponent,
  CheyouMyComponent,
} from './cheyou';
import { GroupBuyPageComponent } from './groupbuy';
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
  AddressCreatorPageComponent
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

@NgModule({
  declarations: [
    FooterBarComponent,

    HomePageComponent,
    NoContent,
    AccountPageComponent,
    AddressManagePageComponent, AddressEditorPageComponent,
    CartListPageComponent,
    CategoryPageComponent,

    CheckoutRouteComponent,
    CheckoutContentComponent,
    CheckoutAddrsComponent,
    CheckoutAddrCreatorComponent,
    InvoicePageComponent,

    CheyouHubComponent,
    CheyouDetailComponent,
    CheyouBuyComponent,
    CheyouListComponent,
    CheyouMyComponent,

    GroupBuyPageComponent,
    HistoryComponent,
    MemberPageComponent,
    MemberQrComponent,

    OrderRouteComponent,
    OrderListComponent,
    OrderEvalComponent,
    OrderDetailPageComponent,
    DeliveryPageComponent,

    ProductRouteComponent,
    ProductsPageComponent,
    ProductPageComponent,
    ProductInfoComponent,
    ProductDetailComponent,
    ProductEvalComponent,
    AddressSelectorPageComponent,
    AddressCreatorPageComponent,

    SafeComponent,
    PasswordComponent,
    BindPhoneComponent,
    PaykeyComponent,
    PaykeyForgetComponent,
    PaykeySetComponent,

    SearchPageComponent,

    WalletRouteComponent,
    WalletComponent,
    BalanceComponent,
    BalanceDepositComponent,
    BalanceRefillComponent,
    BalanceWithdrawComponent,
    PointsComponent,
    RewardComponent,

    WeixinOauthPageComponent,
    WishlistPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    KSSwiperModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    KSSwiperModule,
  ],
})
export class SharedModule {
}
