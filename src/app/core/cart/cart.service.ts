import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { ISku } from '../product';
import { ICartItem } from './cart-item';

@Injectable()
export class CartService {

  private _items: Observable<ICartItem[]> = null;

  constructor(private http: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<ICartItem[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.CART_LIST).
        map(res => (<ICartItem[]>res.json()).map(this.initItem).sort((b, a) => a.CreatedAt - b.CreatedAt)).
        publishReplay(1).refCount();
    }
    return this._items;
  }

  add(sku: ISku, quantity: number): Observable<void> {
    return this.http.post(URLS.CART_ADD, JSON.stringify({
      SkuID: sku.ID,
      Quantity: quantity,
    })).flatMap(res => {
      return this._items ? this._items.map(items => {
        this._items = Observable.of([this.initItem(<ICartItem>res.json()), ...items]);
      }) : Observable.of<void>(null);
    });
  }

  computeTotal(items: ICartItem[]): number {
    return items ? items.map(item => !item.checked ? 0 : item.Price * item.Quantity).reduce((a, b) => a + b, 0) : 0;
  }

  delete(id: number): Observable<void> {
    // DELETE /cart/:id
    return this.http.delete(URLS.Cart(id)).flatMap(res => {
      return this._items ? this._items.map(items => {
        let i = items.findIndex(item => item.ID == id);
        (~i) && items.splice(i, 1);
        this._items = Observable.of([...items]);
      }) : Observable.of<void>(null);
    });
  }

  clear() {
    return this.http.delete(URLS.CART_LIST).map(_ => this.clearCache());
  }

  saveQuantity(item: ICartItem) {
    return this.http.post(URLS.CART_SET_QUANTITY, {
      product: item.ID,
      quantity: item.Quantity,
    });
  }

  private initItem(item: ICartItem) {
    let sku = item.Sku;
    let product = sku ? sku.Product : null;

    item.invalid = !product;
    item.checked = !item.invalid && item.checked !== false;

    let img = sku ? sku.Img : null;
    img = img || product ? product.Img : null;
    item.Img = img || item.Img;

    item.Name = product ? (product.Name ? product.Name : item.Name) : item.Name;
    item.Price = sku ? sku.SalePrice : item.Price;
    item.Quantity = sku ? sku.Quantity : item.Quantity;

    // TODO add sku attrs

    return item
  }

}
