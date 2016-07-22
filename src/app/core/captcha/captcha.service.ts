import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { ICaptcha } from './captcha';

@Injectable()
export class CaptchaService {

  constructor(private http: Http) { }

  getCaptcha(): Observable<ICaptcha> {
    return this.http.post(URLS.CAPTHCA, '').map(res => {
      let captcha = <ICaptcha>res.json();
      captcha.Data = `data:image/png;base64,${captcha.Base64}`;
      return captcha;
    });
  }

}
