import { ISku, IProductAttr } from '../product';

export interface ICartItem {
  ID: number;
  Img: string;
  Name: string;
  Type: string; // sku attrs
  Price: number;
  Quantity: number;
  CreatedAt: number;
  Sku: ISku; // with product proloaded

  checked?: boolean;
  invalid?: boolean;
}

// TODO
export interface ICartResponse {
  Items: ICartItem[];
  Attrs: IProductAttr[];
}
