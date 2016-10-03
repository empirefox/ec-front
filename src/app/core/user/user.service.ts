import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
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

@Injectable()
export class UserService {

  private _userinfo: Observable<IUserInfo>;
  private headSrc: Observable<string>;
  private headNonce: string = nonce(8);

  constructor(
    private router: Router,
    private rawHttp: Http,
    private http: AuthHttp,
    private profileService: ProfileService,
    private jwt: Jwt) { }

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
    if (!this._userinfo) {
      this.jwt.accessToken = '';
      this.jwt.refreshToken = '';
      return this.mustUpdateToken().flatMap(_ => Observable.throw('Login'));
    }
    return this._userinfo;
  }

  setUserinfo(writable: ISetUserInfoPayload): Observable<IUserInfo> {
    let user$ = this.http.post(URLS.USER_SET_INFO, JSON.stringify(writable)).flatMap(res => {
      return this.getUserinfo().flatMap(info => {
        let data = <ISetUserInfoResponse>res.json();
        info.UpdatedAt = data.UpdatedAt;
        return Observable.of(Object.assign({}, info));
      });
    }).publishReplay(1).refCount();
    return this._userinfo = user$;
  }

  // return times can be sent
  // tslint:disable-next-line:variable-name
  preBindPhone(Phone: string): Observable<number> {
    let payload: IPreBindPhonePayload = { Phone };
    return this.http.post(URLS.USER_PREBIND_PHONE, JSON.stringify(payload)).map(res => <number>res.json());
  }

  bindPhone(payload: IBindPhonePayload): Observable<string> {
    payload.RefreshToken = this.jwt.refreshToken;
    return this.http.post(URLS.USER_BIND_PHONE, JSON.stringify(payload)).map(res => this._updateToken(res.json()));
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
        return this._userinfo = Observable.of(Object.assign({}, info)).publishReplay(1).refCount();
      });
    });
  }

  exchange(query: WxCodeResult): Observable<string> {
    return query.code && query.state && query.state === this.jwt.getOauth2State() ?
      this.rawHttp.get(config.wxExchangeCode(query.code)).map(res => this._parseAuthResult(<IUserTokenResponse>res.json())) :
      new Observable<string>((obs: any) => { obs.error(new Error()); });
  }

  _parseAuthResult(res: IUserTokenResponse) {
    let claims = this.jwt.decodeToken(res.accessToken);
    let user = res.user;
    user.ID = +claims.uid;
    user.OpenId = claims.oid;
    user.Phone = claims.mob;
    user.User1 = +claims.us1;
    this.jwt.accessToken = res.accessToken;
    this.jwt.refreshToken = res.refreshToken;
    this._userinfo = Observable.of(user).publishReplay(1).refCount();
    return res.accessToken;
  }

  // parseAuthResult(): Observable<string> {
  //   return this.jwt.getAuthResult().map(result => this._parseAuthResult(<IUserTokenResponse>JSON.parse(result)));
  // }

  // used to update token after bootstrap, will trigger login
  mustUpdateToken(): Observable<string> {
    return this.updateToken().catch((err, caught) => {
      return this.profileService.getProfile().flatMap(profile => {
        // clean url
        let {url: u, value: user1} = removeURLParameter(this.router.url, 'u');
        let query = (+user1) ? `?user1=${user1}` : '';
        let state = nonce(8);
        this.jwt.setOauth2State(state);
        this.jwt.setCurrentUrl(u);
        // return this.jwt.setOauth2State(state).flatMap(_ => this.jwt.setCurrentUrl()).flatMap(_ => {
        let codeEndpoint = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        let {WxAppId: appId, WxScope: scope} = profile;
        let redirectUri = encodeURIComponent(`${URLS.WX_OAUTH2_LOCAL}${query}`);
        location.href = `${codeEndpoint}?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        return caught;
        // });
      });
    });
  }

  updateToken(): Observable<string> {
    // return this.parseAuthResult().catch((err, caught) => {
    return this.jwt.canUpdate() ?
      this.http.get(URLS.UserRefreshToken(this.jwt.refreshToken)).map(res => this._updateToken(res.json())) :
      new Observable<string>((obs: any) => {
        obs.error(new Error('Refresh token expired'));
      });
    // });
  }

  isLoggedIn(): boolean {
    return this.jwt.notExpired();
  }

  _updateToken(res: IRefreshTokenResponse): string {
    if (res.OK) {
      this.jwt.accessToken = res.AccessToken;
    }
    return this.jwt.accessToken;
  }

}
