import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, IUserInfo, UserService } from '../core';

@Component({
  template: require('./safe.html'),
})
export class SafeComponent {
  profile: IProfile;
  user: IUserInfo;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.userService.getUserinfo().take(1),
    ).subscribe(([profile, user]: [IProfile, IUserInfo]) => {
      this.profile = profile;
      this.user = user;
    });
  }

  gotoHead() { this.router.navigateByUrl('/safe/head'); }
  gotoBindPhone() { this.router.navigateByUrl('/safe/phone'); }
  gotoPaykey() { this.router.navigateByUrl('/safe/paykey'); }

  get phone() { return this.user.Phone ? this.user.Phone : '未设置' }
  get paykey() { return this.user.HasPayKey ? '更改' : '未设置' }

}
