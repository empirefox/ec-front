import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { URLS } from '../profile';
import { Observable } from 'rxjs/Observable';
import keyBy from 'lodash/keyBy';
import { IProduct } from '../product';
import { IWishItem, IWishListResponse, IWishlistSavePayload } from './wishlist';

@Injectable()
export class WishlistService {

  private _items: Observable<IWishItem[]> = null;

  constructor(private http: AuthHttp) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IWishItem[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.WISH_LIST).map(res => this.parseResponse(res.json() || {})).publishReplay(1).refCount();
    }
    return this._items;
  }

  add(product: IProduct, price: number): Observable<void> {
    let {Name, Img, ID: ProductID} = product;
    let payload: IWishlistSavePayload = { ProductID, Name, Img, Price: price };
    return this.http.post(URLS.WISH_LIST_ADD, JSON.stringify(payload)).flatMap(res => {
      return this._items ? this._items.map(items => {
        let item = this.initItem(res.json(), product);
        let index = items.findIndex(i => i.ID === item.ID);
        if (~index) {
          items[index] = item;
          items = [...items];
        } else {
          items = [item, ...items];
        }
        this._items = Observable.of(items);
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

  private parseResponse(res: IWishListResponse): IWishItem[] {
    let {Items: items = [], Products: products = []} = res;
    let productMap = keyBy(products, item => item.ID);

    return items.map(item => this.initItem(item, productMap[item.ProductID])).sort((b, a) => a.CreatedAt - b.CreatedAt);
  }

  private initItem(item: IWishItem, product: IProduct): IWishItem {
    item.product = product;
    item.invalid = !product;
    item.Img = product ? product.Img : item.Img;
    item.Name = product ? product.Name : item.Name;
    item.Price = product ? (product.skus && product.skus[0] && product.skus[0].SalePrice) : item.Price;

    // TODO add sku price/img

    return item;
  }

}
