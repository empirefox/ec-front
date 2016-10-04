import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { stringify } from 'querystringify';
import { URLS, CommonQuery } from '../profile';
import { IProduct, ISku, IProductQuery } from './product';
import { ProductService } from './product.service';

export abstract class LocalProductBase {
  local: LocalProductService;
}

@Injectable()
export class LocalProductServiceFactory {
  constructor(
    private rawHttp: Http,
    private productService: ProductService) { }

  from(query: CommonQuery): LocalProductService {
    let local = new LocalProductService(this.rawHttp, this.productService);
    local.query = query;
    return local;
  }
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

  exist(): Observable<IProduct[]> {
    if (!this._items) {
      this._items = this._query(this._page = 0).publishReplay(1).refCount();
    }
    return this._items;
  }

  nextItems(): Observable<IProduct[]> {
    if (!this._items) {
      this._items = this._query(this._page = 0).publishReplay(1).refCount();
      return this._items;
    }

    if (this._querying) {
      return this._items;
    }

    this._items = this._items.flatMap(exist => {
      if (exist && exist.length) {
        return this._query(++this._page).
          flatMap(items => Observable.of(items.length ? [...exist, ...items] : exist));
      } else {
        return this._query(this._page = 0);
      }
    });

    this._items = this._items.publishReplay(1).refCount();
    return this._items;
  }

  getItem(id: number): Observable<IProduct> {
    return (this._items || Observable.of([])).flatMap((items) => {
      let item = items.find(i => i.ID === id);
      return item ? this.productService.current = Observable.of(item) : this.productService.getCurrent(id);
    }).publishReplay(1).refCount();
  }

  private _query(page: number): Observable<IProduct[]> {
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
