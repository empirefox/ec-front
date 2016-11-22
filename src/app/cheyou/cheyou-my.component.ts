import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, ISetUserInfoPayload, IUserInfo, UserService } from '../core';

function minValidator(minValue: number) {
  return (c: AbstractControl) => {
    let err = {
      rangeError: {
        given: c.value,
        min: minValue,
      }
    };

    return (c.value < minValue) ? err : null;
  }
}

@Component({
  templateUrl: './cheyou-my.html',
  styleUrls: ['./cheyou-my.css'],
})
export class CheyouMyComponent {

  profile: IProfile;
  user: IUserInfo;
  form: FormGroup;
  failed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    public userService: UserService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.userService.getUserinfo().take(1),
    ).subscribe(([profile, user]: [IProfile, IUserInfo]) => {
      this.profile = profile;
      this.user = user;
      // tslint:disable-next-line:all
      let {Nickname = '', Sex = 0, City = '', Province = '', Birthday = 0, CarInsurance = '', InsuranceFee = 0, CarIntro = '', Hobby = '', Career = '', Demand = '', Intro = ''} = user.Writable;
      this.form = this.fb.group({ Nickname, Sex, City, Province, Birthday, CarInsurance, InsuranceFee: [InsuranceFee, minValidator(0)], CarIntro, Hobby, Career, Demand, Intro });
    });
  }

  onSubmit() {
    this.userService.setUserinfo(<ISetUserInfoPayload>this.form.value).subscribe(
      _ => this.router.navigateByUrl('/cheyou/list'),
      e => {
        this.failed = true;
        setTimeout(_ => this.failed = false, 1000);
      },
    );
  }

  get valid() { return this.form.valid && !this.failed; }
}
