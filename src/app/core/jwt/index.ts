import { Http } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';

import { config } from '../share';
import { Jwt } from './jwt';

export * from './jwt';

export const JWT_PROVIDERS = [
  ...AUTH_PROVIDERS,
  Jwt,
  {
    provide: AuthHttp,
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: config.jwt.accessTokenKey,
        tokenGetter: key => localStorage.getItem(config.jwt.accessTokenKey),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: true,
      }), http);
    },
    deps: [Http],
  }
];
