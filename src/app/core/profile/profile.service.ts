import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS, IProfile } from './profile';

@Injectable()
export class ProfileService {

  private _item: Observable<IProfile> = null;

  constructor(private http: Http) { }

  clearCache() {
    this._item = null;
  }

  getProfile(): Observable<IProfile> {
    if (!this._item) {
      this._item = this.http.get(URLS.PROFILE).map(res => <IProfile>(res.json() || {})).publishReplay(1).refCount();
    }
    return this._item;
  }

}
