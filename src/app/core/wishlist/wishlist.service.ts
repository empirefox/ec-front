import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLS } from '../profile';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../product';
import { IWishItem } from './wishlist';

@Injectable()
export class WishlistService {

  private _items: Observable<IWishItem[]> = null;

  constructor(private http: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IWishItem[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.WISH_LIST).
        map(res => (<IWishItem[]>res.json()).map(this.initItem).sort((b, a) => a.CreatedAt - b.CreatedAt)).
        publishReplay(1).refCount();
    }
    return this._items;
  }

  add(id: number): Observable<void> {
    return this.http.post(URLS.WISH_LIST_ADD, JSON.stringify({ ProductID: id })).flatMap(res => {
      return this._items ? this._items.map(items => {
        this._items = Observable.of([this.initItem(<IWishItem>res.json()), ...items]);
      }) : Observable.of<void>(null);
    });
  }

  delete(id: number): Observable<void> {
    // DELETE /wishlist/:id
    return this.http.delete(URLS.WishItem(id)).flatMap(res => {
      return this._items ? this._items.map(items => {
        let i = items.findIndex(item => item.ID === id);
        if (~i) { items.splice(i, 1); }
        this._items = Observable.of([...items]);
      }) : Observable.of<void>(null);
    });
  }

  private initItem(item: IWishItem) {
    let product = item.Product;

    item.invalid = !product;
    item.Img = product ? product.Img : item.Img;
    item.Name = product ? product.Name : item.Name;

    // TODO add sku price/img

    return item;
  }

}
