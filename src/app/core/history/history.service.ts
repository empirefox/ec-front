import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import keyBy = require('lodash/keyBy');
import { IProduct } from '../product';
import { HistoryItem } from './history';
import { LocaldbService } from '../localdb';

const MAX = 20;

@Injectable()
export class HistoryService {

  private _items: HistoryItem[];

  constructor(private localdbService: LocaldbService) { }

  getItems() {
    if (!this._items) {
      this._items = this.localdbService.getDB().queryAll('history', null).
        map(row => <HistoryItem>row).sort((b, a) => a.ID - b.ID);
    }
    return this._items;
  }

  add(product: IProduct) {
    let index = this.getItems().findIndex(item => item.ProductID === product.ID);
    if (~index) {
      let id = this.getItems()[index].ID;
      this.localdbService.getDB().deleteRows('history', row => row.ID === id);
      this.getItems().splice(index, 1);
    }
    let item = {
      ID: 0,
      ProductID: product.ID,
      Name: product.Name,
      Img: product.Img || product.skus[0].Img,
      Price: product.skus[0].SalePrice,
      Vpn: product.Vpn,
    };
    this.localdbService.getDB().insert('history', item);
    this.getItems().unshift(item);
    if (this.getItems().length > MAX) {
      let map = keyBy(this._items.splice(MAX));
      this.localdbService.getDB().deleteRows('history', row => row.ID in map);
    }
    this.localdbService.getDB().commit();
  }

  clear() {
    this._items = [];
    this.localdbService.getDB().truncate('history');
    this.localdbService.getDB().commit();
  }

}
