import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, IUserInfo, UserService, IVipIntro, VipService } from '../core';

@Component({
  templateUrl: './cheyou-list.html',
  styleUrls: ['./cheyou-list.css'],
})
export class CheyouListComponent {
  profile: IProfile;
  user: IUserInfo;
  items: IVipIntro[];

  constructor(
    private router: Router,
    private profileService: ProfileService,
    public userService: UserService,
    private vipService: VipService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.userService.getUserinfo().take(1),
      this.vipService.getItems().take(1),
    ).subscribe(([profile, user, items]: [IProfile, IUserInfo, IVipIntro[]]) => {
      this.profile = profile;
      this.user = user;
      this.items = items;
    });
  }

  get show() {
    return this.profile && this.user && this.items;
  }

  gotoDetail(item: IVipIntro) { this.router.navigate(['/cheyou/detail', item.ID]); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
