import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { config, URLS, IProfile, ProfileService, WxCodeResult } from '../profile';
import { Jwt } from '../jwt';
import { nonce, removeURLParameter } from '../util';
import {
  ISetUserInfoPayload,
  IUserInfo,
  ISetUserInfoResponse,
  IUserTokenResponse,
  IPreBindPhonePayload,
  IBindPhonePayload,
  IRefreshTokenResponse,
  ISetPaykeyPayload,
} from './user';
import { TokenService } from './token.service';
import { RetryHttp } from './retry-http';

@Injectable()
export class UserService {

  private headSrc: Observable<string>;
  private headNonce: string = nonce(8);

  constructor(
    private router: Router,
    private rawHttp: Http,
    private http: RetryHttp,
    private profileService: ProfileService,
    private jwt: Jwt,
    private tokenService: TokenService) {
  }

  get headSrc$(): Observable<string> {
    if (!this.headSrc) {
      this.headNonce = nonce(8);
      this.headSrc = Observable.forkJoin(
        this.profileService.getProfile().take(1),
        this.getUserinfo().take(1),
      ).map(([profile, user]: [IProfile, IUserInfo]) => `${config.cdnImgOrigin}/${profile.HeadPrefix}/${user.ID}?v=${this.headNonce}`).
        publishReplay(1).refCount();
    }
    return this.headSrc;
  }

  refreshHead() {
    this.headSrc = null;
  }

  getUserinfo(): Observable<IUserInfo> {
    return this.tokenService.getUserinfo();
  }

  setUserinfo(writable: ISetUserInfoPayload): Observable<IUserInfo> {
    let user$ = this.http.post(URLS.USER_SET_INFO, JSON.stringify(writable)).flatMap(res => {
      return this.getUserinfo().flatMap(info => {
        let data = <ISetUserInfoResponse>res.json();
        info.UpdatedAt = data.UpdatedAt;
        return Observable.of(Object.assign({}, info));
      });
    }).publishReplay(1).refCount();
    return this.tokenService._userinfo = user$;
  }

  // return times can be sent
  // tslint:disable-next-line:variable-name
  preBindPhone(Phone: string): Observable<number> {
    let payload: IPreBindPhonePayload = { Phone };
    return this.http.post(URLS.USER_PREBIND_PHONE, JSON.stringify(payload)).map(res => <number>res.json());
  }

  bindPhone(payload: IBindPhonePayload): Observable<string> {
    payload.RefreshToken = this.jwt.refreshToken;
    return this.http.post(URLS.USER_BIND_PHONE, JSON.stringify(payload)).
      map(res => this.tokenService._updateToken(res.json()));
  }

  preSetPaykey() {
    return this.getUserinfo().flatMap(info => {
      if (!info.Phone) {
        return Observable.throw('Phone not binded');
      }
      return this.http.get(URLS.USER_PAYKEY_PRESET);
    });
  }

  setPaykey(payload: ISetPaykeyPayload) {
    return this.getUserinfo().flatMap(info => {
      if (!info.Phone) {
        return Observable.throw('Phone not binded');
      }
      return this.http.post(URLS.USER_PAYKEY_SET, JSON.stringify(payload)).flatMap(_ => {
        info.HasPayKey = true;
        return this.tokenService._userinfo = Observable.of(Object.assign({}, info)).publishReplay(1).refCount();
      });
    });
  }

}
