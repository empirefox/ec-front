import { Observable } from 'rxjs/Observable';
import { CommonQuery } from '../profile';
import { IProductEval } from './eval';
import { ISpecial } from './special';

export interface IProductQuery extends CommonQuery {
  CategoryID?: string;
  SpecialID?: number;
}

// Product Attrs

export interface IProductAttr {
  ID: number;
  Value: string;
  GroupID: number;
  Pos: number;

  group: IProductAttrGroup;
}

export interface IProductAttrGroup {
  ID: number;
  Name: string;
  Pos: number;

  attrs: IProductAttr[];
}

export interface IProductAttrsResponse {
  Groups: IProductAttrGroup[];
  Attrs: IProductAttr[];
  Specials: ISpecial[];
}

export interface ProductAttrs {
  groups: Dict<IProductAttrGroup>;
  attrs: Dict<IProductAttr>;
  specials: Dict<string>;
  specialList: ISpecial[];
}

// Product skus

export interface IProductAttrId {
  ID: number;
  SkuID: number;
  AttrID: number;
}

export interface ISku {
  ID: number;
  Stock: number;
  Img: string;
  SalePrice: number;
  MarketPrice: number;
  Freight: number;
  ProductID: number;

  // ProductAttr[] sorted by Group Pos:
  // [1, 3] of {ID:1, Value:'红色'} {ID:3, Value:'XL'}
  attrs: ProductAttr[];
  product: IProduct;
  quantity: number;
}

// ProductAttr and ProductAttrGroup are copies of interface
export class ProductAttr {
  ID: number;
  Value: string;
  Pos: number;
  Group: ProductAttrGroup;
  Selected: boolean;

  constructor(ia: IProductAttr, Group: ProductAttrGroup) {
    this.ID = ia.ID;
    this.Value = ia.Value;
    this.Pos = ia.Pos;
    this.Group = Group;
  }
}

// ProductAttr and ProductAttrGroup are copies of interface
export class ProductAttrGroup {
  ID: number;
  Name: string;
  Pos: number;
  Attrs: ProductAttr[];

  constructor(ig: IProductAttrGroup, attrs: IProductAttr[]) {
    this.ID = ig.ID;
    this.Name = ig.Name;
    this.Pos = ig.Pos;
    this.Attrs = attrs ? attrs.map(ia => new ProductAttr(ia, this)) : [];
  }
}

export interface IProductRawInfo {
  skus: ISku[];
  attrs: IProductAttrId[];
}

export interface IProduct {
  ID: number;
  Name: string;
  Img: string;
  Intro: string;
  Detail: string;
  Saled: number;
  CreatedAt: number;
  SaledAt: number;
  ShelfOffAt: number;
  CategoryID: number;
  StoreID: number;
  Vpn: number;
  SpecialID: number;

  skus?: ISku[];
  evals$?: Observable<IProductEval>;

  // {
  //   Groups: [{
  //     ID: 2,
  //     Name: '颜色',
  //     Pos: 5,
  //     attrs: [{
  //       ID: 1,
  //       Value: '红色',
  //       Pos: 6
  //     }, {
  //       ID: 2,
  //       Value: '黑色',
  //       Pos: 5
  //     }]
  //   }, {
  //     ID: 1,
  //     Name: '尺寸',
  //     Pos: 3,
  //     attrs: [{
  //       ID: 3,
  //       Value: 'X',
  //       Pos: 4
  //     }, {
  //       ID: 4,
  //       Value: 'XL',
  //       Pos: 3
  //     }]
  //   }]
  // }
  groups?: ProductAttrGroup[];
  proccessed?: boolean;
  raw?: IProductRawInfo;
  sku?: ISku; // for local sku save
}

export interface IProductsBundleResponse {
  Bundle: Dict<IProduct[]>;
  Skus: ISku[];
  Attrs: IProductAttrId[];
}

export interface IProductsResponse {
  Products: IProduct[];
  Skus: ISku[];
  Attrs: IProductAttrId[];
}

export interface ISkusResponse {
  Skus: ISku[];
  Attrs: IProductAttrId[];
}