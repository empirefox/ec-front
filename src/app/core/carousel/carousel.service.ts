import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import { URLS } from '../profile';
import { constMap } from '../consts';
import { descSortor } from '../util';
import { ICarouselItem } from './carousel';

@Injectable()
export class CarouselService {

  private _boards: Observable<Dict<ICarouselItem[]>>;

  constructor(
    private http: Http,
    private router: Router) { }

  getItems(boardName: string): Observable<ICarouselItem[]> {
    let board = constMap.BillboardType[boardName];
    if (!board) {
      return Observable.of([]);
    }
    if (!this._boards) {
      this._boards = this.http.get(URLS.CAROUSEL).map(res => {
        let boards = groupBy(<ICarouselItem[]>res.json() || [], (item: ICarouselItem) => item.Billboard) as Dict<ICarouselItem[]>;
        values(boards).forEach(board => board.sort(descSortor));
        return boards;
      }).publishReplay(1).refCount();
    }
    return this._boards.map(boards => boards[board]);
  }

  clearCache() { this._boards = null; }

  gotoSlide(item: ICarouselItem) {
    // TODO ...
  }

}
