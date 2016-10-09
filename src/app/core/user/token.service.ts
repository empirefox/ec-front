import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { config, URLS, IProfile, ProfileService, WxCodeResult } from '../profile';
import { Jwt } from '../jwt';
import { nonce, removeURLParameter } from '../util';
import { IUserInfo, IUserTokenResponse, IRefreshTokenResponse, ExchangePayload } from './user';

const localUserKey = 'local_user_key';
@Injectable()
export class TokenService {

  _userinfo: Observable<IUserInfo>;

  constructor(
    private router: Router,
    private rawHttp: Http,
    private http: AuthHttp,
    private profileService: ProfileService,
    private jwt: Jwt) { }

  loadUserFromLocal(): IUserInfo {
    try {
      return JSON.parse(localStorage.getItem(localUserKey));
    } catch (e) {
      return null;
    }
  }

  getUserinfo(): Observable<IUserInfo> {
    if (!this._userinfo) {
      let local = this.loadUserFromLocal();
      if (local) {
        return this._userinfo = Observable.of(local);
      }
      this.jwt.accessToken = '';
      this.jwt.refreshToken = '';
      return this.redirectLogin().map(_ => this.loadUserFromLocal());
    }
    return this._userinfo;
  }

  isLoggedIn(): boolean {
    return this.jwt.notExpired();
  }

  exchange(query: WxCodeResult): Observable<string> {
    let {code, state} = query;
    let payload = <ExchangePayload>{ code, state };
    if (+query.user1) {
      payload.user1 = +query.user1;
    }
    return code && state && state === this.jwt.getOauth2State() ?
      this.rawHttp.post(config.wxExchangeCode(), JSON.stringify(payload)).
        flatMap(res => this._parseAuthResult(<IUserTokenResponse>res.json())) :
      new Observable<string>((obs: any) => { obs.error(new Error()); });
  }

  _parseAuthResult(res: IUserTokenResponse) {
    this.jwt.refreshToken = res.RefreshToken;
    return this._setAccessToken(res.AccessToken, res.User);
  }

  // parseAuthResult(): Observable<string> {
  //   return this.jwt.getAuthResult().map(result => this._parseAuthResult(<IUserTokenResponse>JSON.parse(result)));
  // }

  // used to update token after bootstrap, will trigger login
  mustUpdateToken(): Observable<string> {
    return this.updateToken().catch((err, caught) => {
      // TODO remove
      // if (ENV === 'development') {
      //   return this.rawHttp.get(URLS.FAKE_TOKEN).map(res => this._parseAuthResult(<IUserTokenResponse>res.json()));
      // }
      console.log(err)
      return this.redirectLogin();
    });
  }

  updateToken(): Observable<string> {
    // return this.parseAuthResult().catch((err, caught) => {
    return this.jwt.canUpdate() ?
      this.http.get(URLS.UserRefreshToken(this.jwt.refreshToken)).
        flatMap(res => this._updateToken(res.json())).catch((err, caught) => {
          this.jwt.refreshToken = '';
          console.log('Refresh failed');
          return caught;
        }) :
      new Observable<string>((obs: any) => {
        obs.error(new Error('Refresh token expired'));
      });
    // });
  }

  _updateToken(res: IRefreshTokenResponse): Observable<string> {
    if (res.OK) {
      return this._setAccessToken(res.AccessToken);
    }
    return Observable.of(this.jwt.accessToken);
  }

  _setAccessToken(token: string, user?: IUserInfo) {
    this.jwt.accessToken = token;
    let local = user || this.loadUserFromLocal();
    if (local) {
      let claims = this.jwt.decodeToken(token);
      local.ID = +claims.uid;
      local.OpenId = claims.oid;
      local.Phone = claims.mob;
      local.User1 = +claims.us1;
      localStorage.setItem(localUserKey, JSON.stringify(local));
      return Observable.of(token);
    } else {
      return this.redirectLogin();
    }
  }

  redirectLogin() {
    return this.profileService.getProfile().map(profile => {
      console.log('login..................................')
      console.log(this.loadUserFromLocal())
      console.log(this.jwt.accessToken);
      console.log(this.jwt.refreshToken);
      return profile;
    }).delay(600).flatMap(profile => {
      // clean url
      let {url: u, value: user1} = removeURLParameter(this.router.url, 'u');
      let query = (+user1) ? `?user1=${user1}` : '';
      let state = nonce(8);
      this.jwt.setOauth2State(state);
      this.jwt.setCurrentUrl(u);

      let codeEndpoint = 'http://open.weixin.qq.com/connect/oauth2/authorize';
      let {WxAppId: appId, WxScope: scope} = profile;
      let redirectUri = encodeURIComponent(`${URLS.WX_OAUTH2_LOCAL}${query}`);
      location.href = `${codeEndpoint}?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      return Observable.throw('LOGIN');
    });
  }

}
