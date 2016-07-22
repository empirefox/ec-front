import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { ICarouselItem } from './carousel';

@Injectable()
export class CarouselService {

  private _items: Observable<ICarouselItem[]>;

  constructor(private http: Http) { }

  getItems(): Observable<ICarouselItem[]> {
    if (!this._items) {
      this._items = this.http.get(URLS.CAROUSEL).map(res => (<ICarouselItem[]>res.json()).sort((b, a) => a.Pos - b.Pos));
    }
    return this._items;
  }

  clearCache() { this._items = null; }

}
