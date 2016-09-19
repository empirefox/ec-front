import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IProfile, ProfileService, IFan, FansService } from '../core';

@Component({
  template: require('./fans.html'),
  styles: [require('./fans.css')],
})
export class FansComponent {
  profile: IProfile;
  fans: IFan[];

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private fansService: FansService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
    this.fansService.getItems().subscribe(fans => this.fans = fans);
  }

  getFanImg(fan: IFan): string {
    return fan.HeadImageURL || this.profile.DefaultHeadImage;
  }
}
