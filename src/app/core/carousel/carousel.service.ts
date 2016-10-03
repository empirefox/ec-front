import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import URL = require('url-parse');
import groupBy = require('lodash/groupBy');
import values = require('lodash/values');
import { URLS } from '../profile';
import { constMap } from '../consts';
import { posSortor } from '../util';
import { ICarouselItem } from './carousel';

@Injectable()
export class CarouselService {

  private _boards: Observable<Dict<ICarouselItem[]>>;

  constructor(
    private http: Http,
    private router: Router) { }

  getItems(board: number): Observable<ICarouselItem[]> {
    if (!board) {
      return Observable.of([]);
    }
    if (!this._boards) {
      this._boards = this.http.get(URLS.CAROUSEL).map(res => {
        let boards = groupBy(<ICarouselItem[]>res.json() || [], (item: ICarouselItem) => item.Billboard) as Dict<ICarouselItem[]>;
        values(boards).forEach(item => item.sort(posSortor));
        return boards;
      }).publishReplay(1).refCount();
    }
    return this._boards.map(boards => boards[board]);
  }

  clearCache() { this._boards = null; }

  gotoSlide(item: ICarouselItem) {
    if (item.Link) {
      let url = new URL(item.Link);
      let origin = new URL(this.router.url);
      if (url.host === origin.host) {
        this.router.navigateByUrl(url.pathname);
        return;
      }
    }
    if (item.ProductID) {
      this.router.navigateByUrl(`/product/1${item.ProductID}`);
      return;
    }
    if (item.SpecialID) {
      this.router.navigateByUrl('/product/list', { queryParams: { ft: `SpecialID.eq.${item.SpecialID}` } });
      return;
    }
    if (item.CategoryID) {
      this.router.navigateByUrl('/product/list', { queryParams: { ft: `CategoryID.eq.${item.CategoryID}` } });
      return;
    }
  }

}
