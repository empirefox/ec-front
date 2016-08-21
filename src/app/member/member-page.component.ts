import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import {
  IUserInfo,
  UserService,
  IWishItem,
  WishlistService,
  IWallet,
  MoneyService,
  ProfileService,
  HistoryService,
} from '../core';
import { Header1Component } from '../header-bar';
import { OrderListMenuComponent } from './order-list-menu.component';
import { MoneyOverviewComponent } from './money-overview.component';

@Component({
  template: require('./member-page.html'),
  styles: [require('./member-page.css')],
  directives: [Header1Component, OrderListMenuComponent, MoneyOverviewComponent],
})
export class MemberPageComponent {

  defaultHeadImage: string;
  user: IUserInfo;
  wishlistLen: number;
  wallet: IWallet;
  historyLen: number;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private historyService: HistoryService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private moneyService: MoneyService) { }

  ngOnInit() {
    this.historyLen = this.historyService.getItems().length;
    this.profileService.getProfile().take(1).subscribe(profile => this.defaultHeadImage = profile.DefaultHeadImage);
    this.userService.getUserinfo().take(1).subscribe(user => this.user = user);
    this.wishlistService.getItems().take(1).subscribe(items => this.wishlistLen = items.length);
    this.moneyService.getWallet().take(1).subscribe(wallet => this.wallet = wallet);
  }

  get headImage(): string {
    return (this.user && this.user.HeadImageURL) || this.defaultHeadImage;
  }

  onGotoWishlist() { this.router.navigateByUrl('/wishlist'); }
  onGotoHistory() { this.router.navigateByUrl('/history'); }
  onGotoAddressManage() { this.router.navigateByUrl('/addr'); }
  onGotoAccount() { this.router.navigateByUrl('/account'); }
  gotoCheyou() { this.router.navigateByUrl('/cheyou'); }

}
