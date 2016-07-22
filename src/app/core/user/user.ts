export interface IUserInfo {
  ID?: number; // user id
  // UserInfoOut
  Nickname: string;
  Sex: number;
  City: string;
  Province: string;
  HeadImageURL: string;
  Privilege: string;

  Phone: string;
}

export interface IUserTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserInfo;
}

export interface IBindPhoneData {
  Phone: string;
  Code: string;
  CaptchaID: string;
  Captcha: string;
}
