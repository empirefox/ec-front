import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { URLS } from '../profile';
import { updateAfterSave, descSortor } from '../util';
import { IAddress } from './address';

@Injectable()
export class AddressService {

  private _items: Observable<IAddress[]> = null;

  constructor(private http: AuthHttp) { }

  clearCache() {
    this._items = null;
  }

  getItems(): Observable<IAddress[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.ADDR_LIST).map(res =>
        (<IAddress[]>res.json()).sort(descSortor)
      ).publishReplay(1).refCount();
    }
    return this._items;
  }

  getItem(id: number): Observable<IAddress> {
    return this.getItems().map(items => items.find(item => item.ID === id));
  }

  getDefault(): Observable<IAddress> {
    return this.getItems().map(items => items.length ? items[0] : null);
  }

  save(copy: IAddress): Observable<IAddress> {
    return this.http.post(URLS.ADDR_ADD, JSON.stringify(copy)).flatMap(res =>
      this.getItems().map(items => {
        let item = <IAddress>res.json();
        items = updateAfterSave(items, item, copy);
        this._items = Observable.of(items);
        return item;
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete(URLS.Addr(id)).flatMap(res => {
      return this._items ? this._items.map(items => {
        let i = items.findIndex(item => item.ID === id);
        if (~i) { items.splice(i, 1); }
        this._items = Observable.of([...items]);
      }) : Observable.of<void>(null);
    });
  }

}
