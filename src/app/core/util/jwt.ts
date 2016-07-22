import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { JWT_CONFIG } from '../profile';
// import { XstorageService } from '../xstorage';

@Injectable()
export class Jwt extends JwtHelper {

  constructor(
    private router: Router,
    // private xstorageService: XstorageService,
  ) { super(); }

  get refreshToken() { return localStorage.getItem(JWT_CONFIG.refreshTokenKey); }
  set refreshToken(token: string) { localStorage.setItem(JWT_CONFIG.refreshTokenKey, token); }

  get accessToken() { return localStorage.getItem(JWT_CONFIG.accessTokenKey); }
  set accessToken(token: string) { localStorage.setItem(JWT_CONFIG.accessTokenKey, token); }

  // setOauth2State(state: string) { return this.xstorageService.setItem(JWT_CONFIG.oauth2StateKey, state); }
  // setCurrentUrl() { return this.xstorageService.setItem(JWT_CONFIG.currentUrlKey, this.router.url); }
  // getAuthResult() { return this.xstorageService.getDelItem(JWT_CONFIG.authResult); }

  setOauth2State(state: string) { localStorage.setItem(JWT_CONFIG.oauth2StateKey, state); }
  getOauth2State() {
    let state = localStorage.getItem(JWT_CONFIG.oauth2StateKey);
    localStorage.removeItem(JWT_CONFIG.oauth2StateKey);
    return state;
  }

  setCurrentUrl() { localStorage.setItem(JWT_CONFIG.currentUrlKey, this.router.url); }
  getCurrentUrl() {
    let u = localStorage.getItem(JWT_CONFIG.currentUrlKey);
    localStorage.removeItem(JWT_CONFIG.currentUrlKey);
    return u;
  }


  notExpired() { return !this.isTokenExpired(this.accessToken, 10); }
  needUpdate() { return !this.isTokenExpired(this.accessToken, 120); }
  canUpdate() { return !this.isTokenExpired(this.refreshToken, 10); }

}
