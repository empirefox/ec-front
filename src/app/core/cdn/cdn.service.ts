import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { RetryHttp } from '../user';
import { IHeadUptokenResponse, HeadUptoken } from './cdn';

@Injectable()
export class CdnService {

  headUptoken: Observable<HeadUptoken>;

  constructor(private http: RetryHttp) { }

  getHeadUptoken(): Observable<HeadUptoken> {
    this.headUptoken = (this.headUptoken || Observable.of(null)).flatMap(head => {
      return head && head.valid() ? Observable.of(head) :
        this.http.get(URLS.HEAD_UPTOKEN).map(res => new HeadUptoken(<IHeadUptokenResponse>res.json()));
    }).publishReplay(1).refCount();
    return this.headUptoken;
  }

}
