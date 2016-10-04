import { Injectable }   from '@angular/core';
import { Resolve }  from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IProfile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<IProfile> {

  constructor(private profileService: ProfileService) { }

  resolve(): Observable<IProfile> {
    return this.profileService.getProfile();
  }

}
