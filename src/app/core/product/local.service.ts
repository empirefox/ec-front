import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { stringify } from 'querystringify';
import { URLS, CommonQuery } from '../profile';
import { IProduct, ISku, IProductQuery } from './product';
import { ProductService } from './product.service';

export abstract class LocalProductBase {
  items: Observable<IProduct[]>;
}

export class LocalProductService {

  query: CommonQuery;
  private _page: number;

  private _items: Observable<IProduct[]>;
  private _querying = false;

  constructor(
    private rawHttp: Http,
    private productService: ProductService) { }

  clearCache() {
    this._items = null;
  }

  getItems(next: boolean): Observable<IProduct[]> {
    if (!this._items) {
      this._items = this._query({ st: 0 });
      return this._items;
    }

    return this._items.flatMap(exist => {
      if (exist && exist.length) {
        this._items = this._query({ st:10}).
          flatMap(items => Observable.of(items.length ? (next ? [...exist, ...items] : [...items, ...exist]) : exist));
      } else {
        this._items = this._query({ st: 0 });
      }
      return this._items;
    }).publishReplay(1).refCount();
  }

  getItem(id: number): Observable<IProduct> {
    return (this._items || Observable.of([])).flatMap(items => {
      let item = items.find(item => item.ID === id);
      return item ? this.productService.current = Observable.of(item) : this.productService.getCurrent(id);
    }).publishReplay(1).refCount();
  }

  private _query(page: PageQuery): Observable<IProduct[]> {
    if (this._items && this._querying) {
      return this._items;
    }
    this._querying = true;
    return this.productService.query(Object.assign({}, this.query, page)).map(items => {
      this._querying = false;
      return items;
    }).catch((err, caught) => {
      this._querying = false;
      return caught;
    });
  }

}
