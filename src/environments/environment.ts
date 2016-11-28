import { ModeArgs } from './args';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment: ModeArgs = {
  production: false,
  publicOrigin: 'http://www.silu333.com',
  apiOrigin: 'http://api.silu333.com:8080',
  wxCodeEndpoint: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  cdnImgOrigin: 'https://head.silu333.com',
  qrLogoUrl: '',
  vbuysSpecialName: 'vbuys',
};
