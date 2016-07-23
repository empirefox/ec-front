// share between xstorage clients and hub

export const JWT_CONFIG = {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  oauth2StateKey: 'state',
  currentUrlKey: 'current_url',
  authResult: 'auth_result',
};

export const PUBLIC_DOMAIN = '127.0.0.1:3000';
export const API_DOMAIN = '127.0.0.1:9999';
export const PUBLIC_URL = `http://${PUBLIC_DOMAIN}`;
export const API_URL = `http://${API_DOMAIN}`;
export const XSTORAGE_HUB_URL = `${PUBLIC_URL}/xstorage/public-hub.html`;
export const WX_LOGIN_FAILED = `${PUBLIC_URL}/loginfailed`;
export function WxExchangeCode(code) { return `${API_URL}/oauth/wechat?code=${code}`; }

export interface WxCodeResult {
  code: string;
  state: string;
}
