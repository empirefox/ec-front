import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { IAddress } from './address';

const posSortor = (b: IAddress, a: IAddress) => a.Pos - b.Pos;

@Injectable()
export class AddressService {

  private _items: Observable<IAddress[]> = null;

  constructor(private http: Http) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IAddress[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.ADDR_LIST).map(res => (<IAddress[]>res.json()).sort(posSortor)).publishReplay(1).refCount();
    }
    return this._items;
  }

  getItem(id: number): Observable<IAddress> {
    return this.getItems().map(items => items.find(item => item.ID == id));
  }

  getDefault(): Observable<IAddress> {
    return this.getItems().map(items => items.length ? items[0] : null);
  }

  save(copy: IAddress): Observable<IAddress> {
    return this.http.post(URLS.ADDR_ADD, JSON.stringify(copy)).flatMap(res => {
      return this.getItems().map(items => {
        let item = <IAddress>res.json();
        if (!copy.ID) {
          items = [item, ...items];
        } else {
          let i = items.findIndex(i => i.ID == item.ID);
          if (~i) {
            items[i] = item;
          }
          items = [...items];
        }
        this._items = Observable.of(items.sort(posSortor));
        return item;
      });
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete(URLS.Addr(id)).flatMap(res => {
      return this._items ? this._items.map(items => {
        let i = items.findIndex(item => item.ID == id);
        (~i) && items.splice(i, 1);
        this._items = Observable.of([...items]);
      }) : Observable.of<void>(null);
    });
  }

}
