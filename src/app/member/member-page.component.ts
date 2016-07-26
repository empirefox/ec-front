import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserInfo, UserService, IWishItem, WishlistService, IWallet, MoneyService } from '../core';
import { Header1Component } from '../header-bar';
import { OrderListMenuComponent } from './order-list-menu.component';
import { MoneyOverviewComponent } from './money-overview.component';

@Component({
  template: require('./member-page.html'),
  styles: [require('./member-page.css')],
  directives: [Header1Component, OrderListMenuComponent, MoneyOverviewComponent],
})
export class MemberPageComponent {

  user: IUserInfo;
  wishlistLen: number;
  wallet: IWallet;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private userService: UserService,
    private moneyService: MoneyService) { }

  ngOnInit() {
    this.userService.getUserinfo().subscribe(user => this.user = user);
    this.wishlistService.getItems().subscribe(items => this.wishlistLen = items.length);
    this.moneyService.getWallet().subscribe(wallet => this.wallet);
  }

  onGotoWishlist() { this.router.navigate(['/wishlist']); }
  onGotoHistory() { this.router.navigate(['/history']); }
  onGotoAddressManage() { this.router.navigate(['/addr']); }
  onGotoAccount() { this.router.navigate(['/account']); }

}
