import { ISku, IProduct } from '../product';

// SaveToCartPayload
export interface ICartItemContent {
  Img: string;
  Name: string;
  Type: string; // sku attrs
  Price: number;
  Quantity: number;
  SkuID: number;
}

// SetCartQuantityPayload
export interface ICartItem extends ICartItemContent {
  ID: number;
  CreatedAt: number;

  sku?: ISku; // TODO change to lower case
  checked?: boolean;
  invalid?: boolean;
}

export interface ICartResponse {
  Items: ICartItem[]; // can be null
  Skus: ISku[]; // can be null
  Products: IProduct[]; // can be null
}
