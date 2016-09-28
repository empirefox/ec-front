import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService, IUserInfo, UserService, IQiniuItem } from '../core';

const ng2UploaderOptions: any = {
  url: 'https://up.qbox.me',
  maxUploads: 1,
};

@Component({
  template: require('./head.html'),
  styles: [require('./head.css')],
})
export class SetHeadComponent {

  profile: IProfile;
  user: IUserInfo;

  private requesting: boolean;
  private error: string;
  private hasFile: boolean;
  private fileChanged: boolean;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService) { }

  get key() { return `${this.profile.HeadPrefix}/${this.user.ID}` }

  get uploadActive() { return !this.requesting && this.hasFile && this.fileChanged; }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.userService.getUserinfo().take(1),
    ).subscribe(([profile, user]: [IProfile, IUserInfo]) => {
      this.profile = profile;
      this.user = user;
    });
  }

  onSuccess(res: IQiniuItem) {
    this.error = '';
    this.userService.refreshHead();
    this.requesting = false;
    this.fileChanged = false;
  }

  onFail(err) {
    this.error = err.toString() || 'Upload failed';
    this.requesting = false;
  }

  onAdded() {
    this.error = '';
    this.hasFile = true;
    this.fileChanged = true;
  }

  onRemoved() {
    this.error = '';
    this.hasFile = false;
  }

  upload(uploader) {
    if (this.uploadActive) {
      this.error = '';
      this.requesting = true;
      uploader.upload(this.key);
    }
  }

}
