import { IProduct } from '../product';

// TODO sseparet product with item
export interface IWishItem {
  ID: number;
  CreatedAt: number;
  Name: string;
  Img: string;
  Price: number;
  ProductID: number;
  Product?: IProduct;

  invalid?: boolean;
}
