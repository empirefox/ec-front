import { ISku } from '../product';

export interface IGroupBuyItem {
  ID: number;
  Img?: string; // if not present, use sku.Img
  Title: string;
  Reason: string;
  Price: number;
  Start: number;
  End: number;
  SkuID: number;

  sku: ISku;
}

export interface GroupBuy {
  items: IGroupBuyItem[];
  map: Dict<IGroupBuyItem>;
  active: IGroupBuyItem[];
  inactive: IGroupBuyItem[];
}

export interface IGroupBuyResponse {
  Items: IGroupBuyItem[]; // can be null
  Skus: ISku[]; // can be null
}
