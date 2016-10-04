export interface IVipIntro {
  ID: number;
  CreatedAt: number;
  HeadImageURL: string;

  Nickname: string;
  Sex: number;
  City: string;
  Province: string;
  Birthday: number;
  CarInsurance: string;
  InsuranceFee: number;
  CarIntro: string;
  Hobby: string;
  Career: string;
  Demand: string;
  Intro: string;
}

export interface IVipRebateOrigin {
  ID: number;
  CreatedAt: number;
  NotBefore: number;
  ExpiresAt: number;
  OrderID: number;
  ItemID: number;
  Amount: number;
  Balance: number;
  User1: number;
  User1Used: boolean;
}

export interface MyVips {
  current?: IVipRebateOrigin;
  items: IVipRebateOrigin[];
}
