import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { descSortor } from '../util';
import { IFan } from './fans';

@Injectable()
export class FansService {

  constructor(private http: Http) { }

  getItems(): Observable<IFan[]> {
      return this.http.get(URLS.FANS).map(res =>
        (<IFan[]>res.json()).sort(descSortor)
      );
  }

}
