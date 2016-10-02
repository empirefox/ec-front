import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, IVipIntro, VipService, UserService, userTrans } from '../core';

const simpleCols = 'Nickname, Sex, City, Province, Birthday, CarInsurance, InsuranceFee, CarIntro, Hobby, Career'.split(', ');
const descCols = 'Demand, Intro'.split(', ');

@Component({
  templateUrl: './cheyou-detail.html',
  styleUrls: ['./cheyou-detail.css'],
})
export class CheyouDetailComponent {

  trans = userTrans;
  simpleCols = simpleCols;
  descCols = descCols;

  profile: IProfile;
  vip: IVipIntro;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vipService: VipService,
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    if (id) {
      Observable.forkJoin(
        this.profileService.getProfile().take(1),
        this.vipService.getItem(id).take(1),
      ).subscribe(([profile, vip]: [IProfile, IVipIntro]) => {
        this.profile = profile;
        this.vip = vip;
      });
    } else {
      this.router.navigate(['./list', { relativeTo: this.route }]);
    }
  }

}
