import { IProduct } from '../product';

export interface IWishItem {
  ID: number;
  CreatedAt: number;
  Name: string;
  Img: string;
  Price: number;
  ProductID: number;

  product?: IProduct;
  invalid?: boolean;
}

export interface IWishListResponse {
  Items: IWishItem[]; // can be null
  Products: IProduct[]; // can be null
}

export interface IWishlistSavePayload {
  ProductID: number;
  Name: string;
  Img: string;
  Price: number;
}
