import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import keyBy = require('lodash/keyBy');
import { URLS, IProfile, ProfileService } from '../profile';
import { IStore } from './store';

@Injectable()
export class StoreService {

  private _items: Observable<Dict<IStore>>;

  constructor(
    private http: Http,
    private profileService: ProfileService) { }

  getItems(): Observable<Dict<IStore>> {
    if (!this._items) {
      this._items = Observable.forkJoin(
        this.profileService.getProfile(),
        this.http.get(URLS.STORE),
      ).map(([profile, res]: [IProfile, Response]) => {
        let items = keyBy(res.json(), (store: IStore) => store.ID) as Dict<IStore>;
        items[0] = { ID: 0, Name: profile.OfficialStoreName, CreatedAt: 0, User1: 0, Amap: null };
        return items;
      }).publishReplay(1).refCount();
    }
    return this._items;
  }

  clearCache() { this._items = null; }

}
