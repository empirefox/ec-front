import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { URLS } from '../profile';
import { IHeadUptokenResponse, HeadUptoken } from './cdn';

@Injectable()
export class CdnService {

  headUptoken: Observable<HeadUptoken>;

  constructor(private http: AuthHttp) { }

  getHeadUptoken(): Observable<string> {
    this.headUptoken = (this.headUptoken || Observable.of(<HeadUptoken>{})).flatMap(head => {
      return head.valid() ? Observable.of(head) :
        this.http.get(URLS.HEAD_UPTOKEN).map(res => new HeadUptoken(<IHeadUptokenResponse>res.json()));
    }).publishReplay(1).refCount();
    return this.headUptoken.map(head => head.token);
  }

}
