import { Injectable } from '@angular/core';
import keyBy from 'lodash-es/keyBy';
import { IProduct } from '../product';
import { HistoryItem } from './history';

const MAX = 20;
const historyKey = 'cheyou_local_history';

@Injectable()
export class HistoryService {

  private _items: HistoryItem[];

  constructor() { }

  getItems() {
    if (!this._items) {
      try {
        this._items = JSON.parse(localStorage.getItem(historyKey)).sort((b, a) => a.ID - b.ID);
      } catch (e) {
        this._items = [];
      }
    }
    return this._items;
  }

  add(product: IProduct) {
    let index = this.getItems().findIndex(item => item.ProductID === product.ID);
    if (~index) {
      let id = this.getItems()[index].ID;
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
    this.getItems().unshift(item);
    if (this.getItems().length > MAX) {
      let map = keyBy(this._items.splice(MAX));
    }
    localStorage.setItem(historyKey, JSON.stringify(this._items));
  }

  clear() {
    this._items = [];
    localStorage.setItem(historyKey, '[]');
  }

}
