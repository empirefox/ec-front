import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { RetryHttp } from '../user';
import { createdAtSortor } from '../util';
import { IFan } from './fans';

@Injectable()
export class FansService {

  constructor(private http: RetryHttp) { }

  getItems(): Observable<IFan[]> {
    return this.http.get(URLS.FANS).map(res =>
      (<IFan[]>res.json() || []).sort(createdAtSortor)
    );
  }

}
