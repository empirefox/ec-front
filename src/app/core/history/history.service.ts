import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { keyBy } from 'lodash';
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
    let item = {
      ID: 0,
      ProductID: product.ID,
      Name: product.Name,
      Img: product.Img || product.Skus[0].Img,
      Price: product.Skus[0].SalePrice,
    };
    this.localdbService.getDB().insert('history', item);
    this.getItems().unshift(item);
    if (this._items.length > MAX) {
      let map = keyBy(this._items.splice(MAX));
      this.localdbService.getDB().deleteRows('history', row => !!map[row.ID]);
    }
  }

  clear() {
    this._items = [];
    this.localdbService.getDB().truncate('history');
  }

}
