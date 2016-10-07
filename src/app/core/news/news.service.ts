import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private rawHttp: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(next: boolean): Observable<INewsItem[]> {
    if (!this._items) {
      this._items = this._query({ sz: 30, ob: 'CreatedAt.desc' }).publishReplay(1).refCount();
      return this._items;
    }

    if (this._querying) {
      return this._items;
    }

    this._items = this._items.flatMap(exist => {
      if (exist && exist.length) {
        let filter = next ?
          `CreatedAt.lt.${exist[exist.length - 1].CreatedAt}` :
          `CreatedAt.gt.${exist[0].CreatedAt}`;
        return this._query({ sz: 30, ob: 'CreatedAt.desc', ft: filter }).
          flatMap(items => Observable.of(items.length ? (next ? [...exist, ...items] : [...items, ...exist]) : exist));
      } else {
        return this._query({ sz: 30, ob: 'CreatedAt.desc' });
      }
    });

    this._items = this._items.publishReplay(1).refCount();
    return this._items;
  }

  getItem(id: number): Observable<INewsItem> {
    return (this._items || Observable.of([])).flatMap(items => {
      let item = items.find(i => i.ID === id);
      return item ? Observable.of(item) : this._queryOne(id);
    }).publishReplay(1).refCount().catch((err, caught) => {
      this.router.navigateByUrl('/news');
      return caught;
    });
  }

  private _queryOne(id: number): Observable<INewsItem> {
    return this._current = (this._current || Observable.of(<INewsItem>{ ID: 0 })).flatMap(current => {
      return current && current.ID === id ? Observable.of(current) :
        this.rawHttp.get(URLS.NewsItem(id)).map(res => res.json());
    });
  }

  private _query(query: INewsQuery): Observable<INewsItem[]> {
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
