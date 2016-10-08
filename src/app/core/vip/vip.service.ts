import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import keyBy = require('lodash/keyBy');
import { URLS } from '../profile';
import { createdAtSortor } from '../util';
import { RetryHttp } from '../user';
import { IVipIntro, IVipRebateOrigin, MyVips, IVipRebateOriginResponse } from './vip';

@Injectable()
export class VipService {

  private _items: Observable<IVipIntro[]> = null;

  constructor(
    private rawHttp: Http,
    private http: RetryHttp) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IVipIntro[]> {
    if (!this._items) {
      this._items = this.rawHttp.get(URLS.VIPS).map(res =>
        (<IVipIntro[]>res.json() || []).sort(createdAtSortor)
      ).publishReplay(1).refCount();
    }
    return this._items;
  }

  getItem(id: number): Observable<IVipIntro> {
    return this.getItems().map(items => items.find(item => item.ID === id));
  }

  getMyVips(): Observable<MyVips> {
    return this.http.get(URLS.MY_VIPS).map(res => {
      let items = <IVipRebateOrigin[]>(res.json() || []).sort(createdAtSortor);
      let now = Date.now() / 1000;
      let current = items.find(item => item.NotBefore <= now && now < item.ExpiresAt);
      return { current, items };
    });
  }

  getQualifications(): Observable<IVipRebateOrigin[]> {
    return this.http.get(URLS.QUALIFICATIONS).map(res => {
      let r = <IVipRebateOriginResponse>res.json();
      let items = r.Items || [];
      let names = keyBy(r.Names, item => item.ID);
      items.forEach(item => item.name = names[item.UserID] && names[item.Amount].Nickname);
      let now = Date.now() / 1000;
      return items.filter(item => !item.User1Used && item.NotBefore <= now).sort(createdAtSortor);
    })
  }

}
