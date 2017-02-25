import { ModeArgs } from './args';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment: ModeArgs = {
  production: false,
  publicOrigin: '',
  apiOrigin: 'http://115.159.221.108:8888',
  wxCodeEndpoint: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  cdnImgOrigin: 'http://oegt06nh8.bkt.clouddn.com',
  qrLogoUrl: '',
  vbuysSpecialName: 'vbuys',
};
