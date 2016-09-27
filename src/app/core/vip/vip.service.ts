import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { descSortor } from '../util';
import { IVipIntro, IVipRebateOrigin, MyVips } from './vip';

@Injectable()
export class VipService {

  private _items: Observable<IVipIntro[]> = null;

  constructor(
    private rawHttp: Http,
    private http: AuthHttp) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IVipIntro[]> {
    if (!this._items) {
      this._items = this.rawHttp.get(URLS.VIPS).map(res =>
        (<IVipIntro[]>res.json() || []).sort(descSortor)
      ).publishReplay(1).refCount();
    }
    return this._items;
  }

  getItem(id: number): Observable<IVipIntro> {
    return this.getItems().map(items => items.find(item => item.ID === id));
  }

  getMyVips(): Observable<MyVips> {
    return this.http.get(URLS.MY_VIPS).map(res => {
      let items = <IVipRebateOrigin[]>(res.json() || []).sort(descSortor);
      let now = Date.now() / 1000;
      let current = items.find(item => item.NotBefore <= now && now < item.ExpiresAt);
      return { current, items };
    });
  }

  getQualifications(): Observable<IVipRebateOrigin[]> {
    return this.http.get(URLS.QUALIFICATIONS).
      map(res => (<IVipRebateOrigin[]>res.json() || []).filter(item => !item.User1Used).sort(descSortor));
  }

}
