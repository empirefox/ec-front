import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { createdAtSortor } from '../util';
import { IFan } from './fans';

@Injectable()
export class FansService {

  constructor(private http: AuthHttp) { }

  getItems(): Observable<IFan[]> {
    return this.http.get(URLS.FANS).map(res =>
      (<IFan[]>res.json() || []).sort(createdAtSortor)
    );
  }

}
