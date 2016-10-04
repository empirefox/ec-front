import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import keyBy = require('lodash/keyBy');
import { URLS } from '../profile';
import { IGroupBuyItem, GroupBuy, IGroupBuyResponse } from './groupbuy';

@Injectable()
export class GroupBuyService {

  private _gb: Observable<GroupBuy>;

  constructor(private http: Http) { }

  getItems(): Observable<GroupBuy> {
    if (!this._gb) {
      this._gb = this.http.get(URLS.GROUP_BUY).map(res => this.parseResponse(res.json() || {})).publishReplay(1).refCount();
    }
    return this._gb;
  }

  getItem(skuId: number): Observable<IGroupBuyItem> {
    return this.getItems().map(gb => gb.map[skuId]);
  }

  clearCache() { this._gb = null; }

  private parseResponse(res: IGroupBuyResponse): GroupBuy {
    let items = res.Items || [];
    let skus = res.Skus || [];

    let skuMap = keyBy(skus, item => item.ID);
    let map: Dict<IGroupBuyItem> = {};
    let active: IGroupBuyItem[] = [];
    let inactive: IGroupBuyItem[] = [];
    items.sort((a, b) => a.Start - b.Start).forEach(item => {
      item.sku = skuMap[item.SkuID];
      (item.End > Date.now() / 1000 ? active : inactive).push(item);
      map[item.ID] = item;
    });
    return { items, map, active, inactive };
  }

}
