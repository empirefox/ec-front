import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { URLS } from '../profile';
import { ICaptcha } from './captcha';

@Injectable()
export class CaptchaService {

  constructor(private http: AuthHttp) { }

  getCaptcha(): Observable<ICaptcha> {
    return this.http.get(URLS.CAPTHCA).map(res => {
      let captcha = <ICaptcha>res.json();
      captcha.data = `data:image/png;base64,${captcha.Base64}`;
      return captcha;
    });
  }

}
