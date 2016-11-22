import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {
  IProfile,
  IUserInfo,
  UserService,
  IWishItem,
  WishlistService,
  IWallet,
  HistoryService,
} from '../core';

@Component({
  templateUrl: './member-page.html',
  styleUrls: ['./member-page.css'],
})
export class MemberPageComponent {

  profile: IProfile;
  user: IUserInfo;
  wishlistLen: number;
  wallet: IWallet;
  historyLen: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService,
    private wishlistService: WishlistService,
    public userService: UserService) { }

  ngOnInit() {
    let data = <{ profile: IProfile, user: IUserInfo, wallet: IWallet }>this.route.snapshot.data;
    this.profile = data.profile;
    this.user = data.user;
    this.wallet = data.wallet;
    this.historyLen = this.historyService.getItems().length;
    this.wishlistService.getItems().take(1).subscribe(items => this.wishlistLen = items.length);
  }

  onGotoWishlist() { this.router.navigateByUrl('/wishlist'); }
  onGotoHistory() { this.router.navigateByUrl('/history'); }
  onGotoAddressManage() { this.router.navigateByUrl('/addr'); }
  onGotoSafe() { this.router.navigateByUrl('/safe'); }
  gotoQualification() { this.router.navigateByUrl('/qualification'); }
  gotoQr() { this.router.navigateByUrl('/member-qr'); }
  gotoFans() { this.router.navigateByUrl('/fans'); }

}
