import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { ProductService, O2M_PRODUCT_SKUS_OPTION } from './product.service';
import {
  IProduct,
  IProductAttr,
  IProductAttrGroup,
  IProductAttrId,
  IProductAttrsResponse,
  ISku,
  IProductRawInfo,
} from './product';
import { one2manyRelate } from '../util';


let posAttr = 0;
let createAttr = (ID: number, Value: string, GroupID: number): IProductAttr => {
  return { ID, Value, GroupID, Pos: posAttr++ };
};
const attrs: IProductAttr[] = [
  createAttr(1, 'X', 1),
  createAttr(2, 'XL', 1),
  createAttr(3, 'red', 2),
];


let posGroup = 0;
let createGroup = (ID: number, Name: string): IProductAttrGroup => {
  return { ID, Name, Pos: posGroup++ };
};
const groups: IProductAttrGroup[] = [
  createGroup(1, 'color'),
  createGroup(2, 'size'),
];


let createAttrId = (ID: number, SkuID: number, AttrID: number): IProductAttrId => {
  return { ID, SkuID, AttrID };
};
const attrIds: IProductAttrId[] = [
  createAttrId(1, 1, 1),
  createAttrId(2, 1, 3),
];


let createProduct = (
  ID: number,
  Name: string,
  Intro: string,
  Detail: string,
  Img: string,
  Saled: number,
  saleUserId: number,
  CreatedAt: number,
  status: number,
  SaledAt: number,
  ShelfOffAt: number,
  CategoryID: number): IProduct => {
  return { ID, Name, Img, Intro, Detail, Saled, ForSale: !!status, CreatedAt, SaledAt, ShelfOffAt, CategoryID };
};
const products: IProduct[] = [
  createProduct(
    1,
    'snoy tv',
    'tv introduction',
    'tv detail',
    `img/tj1.jpg`,
    50, 0, 0, 1, 0, 0, 1),
];

let createSku = (ID: number, ProductID: number, Stock: number, Img: string, SalePrice: number, MarketPrice: number, Freight: number): ISku => {
  return { ID, ProductID, Stock, Img, SalePrice, MarketPrice, Freight };
};
const skus: ISku[] = [
  createSku(1, 1, 99, `tj2.jpg`, 12000, 13000, 20000),
];

const attrsData: IProductAttrsResponse = { Groups: groups, Attrs: attrs };

const productRaw: IProductRawInfo = {
  skus: skus,
  attrs: attrIds
};


describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      ProductService
    ]
  }));


  it('should proccess Skus', inject([ProductService], (service) => {
    let parsedAttrs = service.initAttrs(attrsData);
    expect(Object.keys(parsedAttrs.Groups).length).toBe(2);
    expect(Object.keys(parsedAttrs.Attrs).length).toBe(3);

    service._attrs = Observable.of(parsedAttrs);
    let p = products[0];
    p.raw = productRaw;
    one2manyRelate([p], skus, O2M_PRODUCT_SKUS_OPTION);
    expect(p.Skus.length).toBe(1);
    expect(skus[0].Product).toBeDefined();

    (<ProductService>service).proccessSkus(p).subscribe(product => {
      expect(product.proccessed).toBe(true);
      expect(product.Groups.length).toBe(2);
      expect(product.Groups[0].Name).toBe('size');
      expect(product.Groups[0].Attrs.length).toBe(1);
      expect(product.Skus.length).toBe(1);
      expect(product.Skus[0].Attrs.length).toBe(2);
      expect(product.Skus[0].Attrs.map(attr => attr.Value).sort()).toEqual(['X', 'red']);
    });
  }));

});
