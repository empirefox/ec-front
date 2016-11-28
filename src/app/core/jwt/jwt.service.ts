import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { config } from '../profile/';

@Injectable()
export class JwtService {
  helper = new JwtHelper();

  constructor(private router: Router) { }

  get refreshToken() { return localStorage.getItem(config.jwt.refreshTokenKey); }
  set refreshToken(token: string) { localStorage.setItem(config.jwt.refreshTokenKey, token); }

  get accessToken() { return localStorage.getItem(config.jwt.accessTokenKey); }
  set accessToken(token: string) { localStorage.setItem(config.jwt.accessTokenKey, token); }

  setOauth2State(state: string) { localStorage.setItem(config.jwt.oauth2StateKey, state); }
  getOauth2State() {
    let state = localStorage.getItem(config.jwt.oauth2StateKey);
    localStorage.removeItem(config.jwt.oauth2StateKey);
    return state;
  }

  setCurrentUrl(u: string) { localStorage.setItem(config.jwt.currentUrlKey, u); }
  getCurrentUrl() {
    let u = localStorage.getItem(config.jwt.currentUrlKey);
    localStorage.removeItem(config.jwt.currentUrlKey);
    return u;
  }

  tokenExpired(token: string, offsetSeconds?: number) {
    try {
      return !token || this.helper.isTokenExpired(token, offsetSeconds);
    } catch (error) {
      return false;
    }
  }

  notExpired() { return !this.tokenExpired(this.accessToken, 10); }
  needUpdate() { return !this.tokenExpired(this.accessToken, 120); }
  canUpdate() { return this.refreshToken && this.notExpired(); }

}
