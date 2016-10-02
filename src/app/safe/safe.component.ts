import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, IUserInfo, UserService } from '../core';

@Component({
  templateUrl: './safe.html',
})
export class SafeComponent {
  profile: IProfile;
  user: IUserInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    let data = <{ profile: IProfile, user: IUserInfo }>this.route.snapshot.data;
    this.profile = data.profile;
    this.user = data.user;
  }

  gotoHead() { this.router.navigateByUrl('/safe/head'); }
  gotoBindPhone() { this.router.navigateByUrl('/safe/phone'); }
  gotoPaykey() { this.router.navigateByUrl('/safe/paykey'); }

  get phone() { return this.user.Phone ? this.user.Phone : '未设置' }
  get paykey() { return this.user.HasPayKey ? '更改' : '未设置' }

}
