import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, IUserInfo, UserService } from '../core';

@Component({
  template: require('./head.html'),
  styles: [require('./head.css')],
})
export class SetHeadComponent {

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

}
