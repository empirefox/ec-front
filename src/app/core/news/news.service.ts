import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { stringify } from 'querystringify';
import { URLS } from '../profile';
import { createdAtSortor } from '../util';
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
          `CreatedAt:lt:${exist[exist.length - 1].CreatedAt}` :
          `CreatedAt:gt:${exist[0].CreatedAt}`;
        this._items = this._query({ sz: 30, ob: 'CreatedAt:desc', ft: filter }).
          flatMap(items => Observable.of(items.length ? (next ? [...exist, ...items] : [...items, ...exist]) : exist));
      } else {
        this._items = this._query({ sz: 30, ob: 'CreatedAt:desc' });
      }
      return this._items;
    }).publishReplay(1).refCount();
  }

  getItem(id: number): Observable<INewsItem> {
    return (this._items || Observable.of([])).flatMap(items => {
      let item = items.find(item => item.ID === id);
      return item ? Observable.of(item) : this._queryOne(id);
    }).publishReplay(1).refCount();
  }

  private _queryOne(id: number): Observable<INewsItem> {
    return this._current = (this._current || Observable.of(<INewsItem>{ ID: 0 })).flatMap(current => {
      return current && current.ID === id ? Observable.of(current) :
        this.rawHttp.get(URLS.NewsItem(id)).map(res => res.json());
    });
  }

  private _query(query: INewsQuery): Observable<INewsItem[]> {
    if (this._items && this._querying) {
      return this._items;
    }
    this._querying = true;
    return this.rawHttp.get(URLS.NEWS, { search: stringify(query) }).map(res => {
      this._querying = false;
      return (<INewsItem[]>res.json() || []).sort(createdAtSortor);
    }).catch((err, caught) => {
      this._querying = false;
      return caught;
    });
  }
}
