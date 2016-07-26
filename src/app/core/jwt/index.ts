import { Http } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';

import { JWT_CONFIG } from '../share';
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
        tokenName: JWT_CONFIG.accessTokenKey,
        tokenGetter: key => localStorage.getItem(key),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: true
      }), http);
    },
    deps: [Http]
  }
];
