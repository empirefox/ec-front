export interface ModeArgs {
  publicOrigin: string;
  apiOrigin: string;
  cdnImgOrigin: string;
  qrLogoUrl?: string;
  vbuysSpecialName?: string;
}

export interface JwtConfig {
  accessTokenKey: string;
  refreshTokenKey: string;
  oauth2StateKey: string;
  currentUrlKey: string;
  authResult: string;
}

export class Config {
  publicOrigin: string;
  apiOrigin: string;
  cdnImgOrigin: string;
  qrLogoUrl: string;
  vbuysSpecialName: string;

  xstorageHubUrl: string;
  wxLoginFailedUrl: string;

  jwt: JwtConfig;

  constructor(args: ModeArgs, jwt?: JwtConfig) {
    Object.assign(this, args);
    // this.apiOrigin = args.apiOrigin;
    // this.cdnImgOrigin = args.cdnImgOrigin;
    // this.publicOrigin = args.publicOrigin;
    // this.qrLogoUrl = args.qrLogoUrl;
    // this.vbuysSpecialName = args.vbuysSpecialName;

    this.qrLogoUrl = this.qrLogoUrl || '';
    this.vbuysSpecialName = this.vbuysSpecialName || 'vbuys';
    this.xstorageHubUrl = `${args.publicOrigin}/xstorage/public-hub.html`;
    this.wxLoginFailedUrl = `${args.publicOrigin}/loginfailed`;
    this.jwt = jwt || {
      accessTokenKey: 'access_token',
      refreshTokenKey: 'refresh_token',
      oauth2StateKey: 'state',
      currentUrlKey: 'current_url',
      authResult: 'auth_result',
    };
  }

  wxExchangeCode(): string {
    return `${this.apiOrigin}/oauth/wechat`;
  }
}
