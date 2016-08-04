export interface IProductQuery {
  q?: string; // query
  sp?: string; // scope
  ft?: string; // filter
  // gp?: boolean; // group by scopes
  CategoryID?: string;
}

// Product Attrs

export interface IProductAttr {
  ID: number;
  Value: string;
  GroupID: number;
  Pos: number;
  Group?: IProductAttrGroup;
}

export interface IProductAttrGroup {
  ID: number;
  Name: string;
  Pos: number;
  Attrs?: IProductAttr[];
}

export interface IProductAttrsResponse {
  Groups: IProductAttrGroup[];
  Attrs: IProductAttr[];
}

export class ProductAttrs {
  Groups: Dict<IProductAttrGroup>;
  Attrs: Dict<IProductAttr>;
}

// Product skus

export interface IProductAttrId {
  ID: number;
  SkuID: number;
  AttrID: number;
}

export interface ISku {
  ID: number;
  ProductID: number;
  Stock: number;
  Img: string;
  SalePrice: number;
  MarketPrice: number;
  Freight: number;

  // ProductAttr[] sorted by Group Pos:
  // [1, 3] of {ID:1, Value:'红色'} {ID:3, Value:'XL'}
  Attrs?: ProductAttr[];
  Product?: IProduct;
  Quantity?: number;
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

export interface IProduct {
  ID: number;
  Name: string;
  Img: string;
  Intro: string;
  Detail: string;
  Saled: number;
  ForSale: boolean;
  TimeCreated: number;
  TimeSale: number;
  TimeShelf: number;
  CategoryID: number;
  Skus?: ISku[];

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
  Groups?: ProductAttrGroup[];
  proccessed?: boolean;
  raw?: IProductRawInfo;
}

export interface IProductRawInfo {
  skus: ISku[];
  attrs: IProductAttrId[];
}

export interface IProductResponse {
  Product: IProduct;
  Skus: ISku[];
  Attrs: IProductAttrId[];
}

export interface IProductsResponse {
  Products: IProduct[];
  Skus: ISku[];
  Attrs: IProductAttrId[];
}
