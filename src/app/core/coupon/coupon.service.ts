import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { ICoupon } from './coupon';

const sortor = (b: ICoupon, a: ICoupon) => a.CreatedAt - b.CreatedAt;

@Injectable()
export class CouponService {

  private _items: Observable<ICoupon[]> = null;

  constructor(private http: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<ICoupon[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.COUPON_LIST).map(res => (<ICoupon[]>res.json()).sort(sortor)).publishReplay(1).refCount();
    }
    return this._items;
  }

}
