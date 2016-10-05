import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { RetryHttp } from '../user';
import { ICaptcha } from './captcha';

@Injectable()
export class CaptchaService {

  constructor(private http: RetryHttp) { }

  getCaptcha(): Observable<ICaptcha> {
    return this.http.get(URLS.CAPTHCA).map(res => {
      let captcha = <ICaptcha>res.json();
      captcha.data = `data:image/png;base64,${captcha.Base64}`;
      return captcha;
    });
  }

}
