import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { descSortor, objectToParams } from '../util';
import { INewsItem, INewsQuery } from './news';

@Injectable()
export class NewsService {

  private _items: Observable<INewsItem[]> = null;
  private _current: Observable<INewsItem> = null;
  private _querying = false;

  constructor(private rawHttp: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(next: boolean): Observable<INewsItem[]> {
    if (!this._items) {
      this._items = this._query({ sz: 30, ob: 'CreatedAt:desc' });
      return this._items;
    }

    return this._items.flatMap(exist => {
      if (exist && exist.length) {
        let filter = next ?
          `CreatedAt:gt:${exist[0].CreatedAt}` :
          `CreatedAt:lt:${exist[exist.length - 1].CreatedAt}`;
        this._items = this._query({ sz: 30, ob: 'CreatedAt:desc', ft: filter }).
          flatMap(items => Observable.of(items.length ? (next ? [...exist, ...items] : [...items, ...exist]) : exist));
      } else {
        this._items = this._query({ sz: 30, ob: 'CreatedAt:desc' });
      }
      return this._items;
    });
  }

  getItem(id: number): Observable<INewsItem> {
    return (this._items || Observable.of([])).flatMap(items => {
      let item = items.find(item => item.ID === id);
      return item ? Observable.of(item) : this._queryOne(id);
    });
  }

  private _queryOne(id: number): Observable<INewsItem> {
    return this._current = (this._current || Observable.of(<INewsItem>{ ID: 0 })).flatMap(current => {
      return current && current.ID === id ? this._current :
        this._query({ sz: 1, ft: `ID:eq:${id}` }).map(items => items.length ? items[0] : null);
    });
  }

  private _query(query: INewsQuery): Observable<INewsItem[]> {
    if (this._items && this._querying) {
      return this._items;
    }
    this._querying = true;
    return this.rawHttp.get(URLS.NEWS, { search: new URLSearchParams(objectToParams(query)) }).map(res => {
      this._querying = false;
      return (<INewsItem[]>res.json() || []).sort(descSortor);
    }).catch((err, caught) => {
      this._querying = false;
      return caught;
    }).publishReplay(1).refCount();
  }
}
