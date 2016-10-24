import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS, CommonQuery } from '../profile';
import { IProduct, ISku, IProductQuery } from './product';
import { ProductService } from './product.service';

export abstract class LocalProductBase {
  local: LocalProductService;
}

@Injectable()
export class LocalProductServiceFactory {
  constructor(
    private router: Router,
    private rawHttp: Http,
    private productService: ProductService) { }

  from(query: CommonQuery): LocalProductService {
    let local = new LocalProductService(this.router, this.rawHttp, this.productService);
    local.query = query;
    return local;
  }
}

export class LocalProductService {

  query: CommonQuery;

  private _items: Observable<IProduct[]>;
  private _querying = false;

  constructor(
    private router: Router,
    private rawHttp: Http,
    private productService: ProductService) { }

  clearCache() {
    this._items = null;
  }

  exist(): Observable<IProduct[]> {
    if (!this._items) {
      this._items = this._query().publishReplay(1).refCount();
    }
    return this._items;
  }

  nextItems(): Observable<IProduct[]> {
    if (!this._items) {
      console.log('init items')
      this._items = this._query().publishReplay(1).refCount();
      return this._items;
    }

    if (this._querying) {
      return this._items;
    }

    this._items = this._items.flatMap(exist => {
      if (exist && exist.length) {
        console.log('fetch next items')
        return this._query(exist.length).
          flatMap(items => Observable.of(items.length ? [...exist, ...items] : exist));
      } else {
        console.log('try first page items')
        return this._query();
      }
    });

    this._items = this._items.publishReplay(1).refCount();
    return this._items;
  }

  getItem(id: number): Observable<IProduct> {
    return (this._items || Observable.of([])).flatMap((items) => {
      let item = items.find(i => i.ID === id);
      return item ? this.productService.current = Observable.of(item) : this.productService.getCurrent(id);
    }).publishReplay(1).refCount().catch(err => {
      this.productService.getAttrs().subscribe(attrs => {
        this.router.navigate(['/product/list'], { queryParams: { ft: attrs.specials['爆品'] } });
      });
      return Observable.throw('product not found');
    });
  }

  private _query(start: number = 0): Observable<IProduct[]> {
    this._querying = true;
    return this.productService.query(Object.assign({}, this.query, { st: start })).map(items => {
      this._querying = false;
      return items;
    }).catch((err, caught) => {
      this._querying = false;
      return caught;
    });
  }

}
