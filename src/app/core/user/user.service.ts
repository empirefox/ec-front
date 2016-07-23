import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { PATHS, URLS, ProfileService, WxExchangeCode, WxCodeResult } from '../profile';
import { Jwt, nonce } from '../util';
import { IUserInfo, IUserTokenResponse, IBindPhoneData } from './user';

@Injectable()
export class UserService {

  _userinfo: Observable<IUserInfo>;

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private profileService: ProfileService,
    private jwt: Jwt) { }

  getUserinfo() {
    if (!this._userinfo) {
      this._userinfo = this.authHttp.get(URLS.USER_INFO).map(res => <IUserInfo>res.json());
    }
    return this._userinfo;
  }

  // return times can be sent
  preBindPhone(phone: string): Observable<number> {
    return this.authHttp.get(URLS.UserPreBindPhone(phone)).map(res => <number>res.json()).publishReplay(1).refCount();
  }

  // return status 200
  bindPhone(data: IBindPhoneData) {
    return this.authHttp.post(URLS.USER_BIND_PHONE, JSON.stringify(data));
  }

  exchange(query: WxCodeResult): Observable<string> {
    return query.code && query.state && query.state === this.jwt.getOauth2State() ?
      this.http.get(WxExchangeCode(query.code)).map(res => this._parseAuthResult(<IUserTokenResponse>res.json())) :
      new Observable<string>((obs: any) => { obs.error(new Error()); });
  }

  _parseAuthResult(res: IUserTokenResponse) {
    res.user.ID = +this.jwt.decodeToken(res.accessToken).UserId;
    this.jwt.accessToken = res.accessToken;
    this.jwt.refreshToken = res.refreshToken;
    this._userinfo = Observable.of(res.user).publishReplay(1).refCount();
    return res.accessToken;
  }

  // parseAuthResult(): Observable<string> {
  //   return this.jwt.getAuthResult().map(result => this._parseAuthResult(<IUserTokenResponse>JSON.parse(result)));
  // }

  // used to update token after bootstrap, will trigger login
  mustUpdateToken(): Observable<string> {
    return this.updateToken().catch((err, caught) => {
      return this.profileService.getProfile().flatMap(profile => {
        let state = nonce(8);
        this.jwt.setOauth2State(state);
        this.jwt.setCurrentUrl();
        // return this.jwt.setOauth2State(state).flatMap(_ => this.jwt.setCurrentUrl()).flatMap(_ => {
        let codeEndpoint = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        let {WxAppId: appId, WxScope: scope} = profile;
        let redirectUri = encodeURIComponent(`${location.protocol}//${location.host}${PATHS.WX_OAUTH2_LOCAL_PATH}`);
        location.href = `${codeEndpoint}?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        return caught;
        // });
      });
    });
  }

  updateToken(): Observable<string> {
    // return this.parseAuthResult().catch((err, caught) => {
    return this.jwt.canUpdate() ? this.http.get(URLS.UserRefreshToken(this.jwt.refreshToken)).map(res => {
      let accessToken = <string>res.json().accessToken;
      this.jwt.accessToken = accessToken;
      return accessToken;
    }) : new Observable<string>((obs: any) => {
      obs.error(new Error('Refresh token expired'));
    });
    // });
  }

}
