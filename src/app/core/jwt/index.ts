import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { config } from '../share';
import { JwtService } from './jwt.service';

export { JwtService }

export function authHttpFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: config.jwt.accessTokenKey,
    tokenGetter: () => new Promise(
      (resolve, reject) => resolve(localStorage.getItem(config.jwt.accessTokenKey))
    ),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: true,
  }), http);
}

export const JWT_PROVIDERS = [
  JwtService,
  {
    provide: AuthHttp,
    useFactory: authHttpFactory,
    deps: [Http],
  }
];
