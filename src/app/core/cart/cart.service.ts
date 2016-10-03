import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import keyBy from 'lodash/keyBy';
import { updateAfterSave, createdAtSortor } from '../util';
import { constMap } from '../consts';
import { URLS } from '../profile';
import { ISku } from '../product';
import { ICartItemContent, ICartItem, ICartResponse } from './cart-item';

@Injectable()
export class CartService {

  private _items: Observable<ICartItem[]> = null;

  constructor(private http: AuthHttp) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<ICartItem[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.CART_ALL).
        map(res => this.parseResponse(res.json() || {}).map(this.initItem).sort(createdAtSortor)).
        publishReplay(1).refCount();
    }
    return this._items;
  }

  add(sku: ISku): Observable<ICartItem> {
    let payload: ICartItemContent = {
      Img: sku.Img || sku.product.Img,
      Name: sku.product.Name,
      Type: sku.attrs.map(attr => attr.Value).join(' '),
      Price: sku.SalePrice,
      Quantity: sku.quantity < 1 ? 1 : sku.quantity,
      SkuID: sku.ID,
    };
    return this._save(payload);
  }

  computeTotal(items: ICartItem[]): number {
    return items ? items.map(item => !item.checked ? 0 : item.Price * item.Quantity).reduce((a, b) => a + b, 0) : 0;
  }

  delete(skuIds: number[]): Observable<void> {
    // DELETE /cart/:id
    return this.http.delete(URLS.CART_ALL, { search: skuIds.map(id => `s=${id}`).join('&') }).flatMap(res => {
      return this._items ? this._items.map(items => {
        items = items.filter(item => !~skuIds.indexOf(item.SkuID));
        this._items = Observable.of(items);
      }) : Observable.of<void>(null);
    });
  }

  clear() {
    return this.http.delete(URLS.CART_ALL, { search: 's=all' }).map(_ => this.clearCache());
  }

  save(item: ICartItem) {
    // tslint:disable-next-line:variable-name
    let {ID, Img, Name, Type, Price, Quantity, SkuID} = item;
    let payload: ICartItemContent = { ID, Img, Name, Type, Price, Quantity, SkuID };
    return this._save(payload);
  }

  private parseResponse(res: ICartResponse): ICartItem[] {
    let {Items: items = [], Skus: skus = [], Products: products = []} = res;
    let skuMap = keyBy(skus, item => item.ID);
    let productMap = keyBy(products, item => item.ID);
    items.forEach(item => {
      let sku = skuMap[item.SkuID];
      if (sku) {
        sku.product = productMap[sku.ProductID];
        item.sku = sku;
      }
    });
    return items;
  }

  private initItem(item: ICartItem) {
    let sku = item.sku;
    let product = sku ? sku.product : null;

    item.invalid = !product || product.Vpn !== constMap.VpnType.TVpnNormal;
    item.checked = !item.invalid && item.checked !== false;

    let img = sku ? sku.Img : null;
    img = img || (product ? product.Img : null);
    item.Img = img || item.Img;

    item.Name = product ? (product.Name ? product.Name : item.Name) : item.Name;
    item.Price = sku ? sku.SalePrice : item.Price;
    item.Quantity = sku ? sku.quantity : item.Quantity;

    // TODO add sku attrs

    return item;
  }

  private _save(payload: ICartItemContent): Observable<ICartItem> {
    return this.http.post(URLS.CART_ALL, JSON.stringify(payload)).flatMap(res => {
      let item: ICartItem = res.json();
      return this._items ? this._items.map(items => {
        items = updateAfterSave(items, item, payload.ID).sort(createdAtSortor);
        this._items = Observable.of(items);
        return item;
      }) : Observable.of(item);
    });
  }

}
