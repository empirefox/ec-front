import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProfile, ProfileService, IFan, FansService } from '../core';

@Component({
  templateUrl: './fans.html',
  styleUrls: ['./fans.css'],
})
export class FansComponent {
  profile: IProfile;
  fans: IFan[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private fansService: FansService) { }

  ngOnInit() {
    let data = <{ profile: IProfile, fans: IFan[] }>this.route.snapshot.data;
    this.profile = data.profile;
    this.fans = data.fans;
  }

}
