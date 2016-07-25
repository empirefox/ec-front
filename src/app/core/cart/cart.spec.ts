import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';

import { CartService } from './cart.service';
import { ICartItem } from './cart-item';
import { ISku, IProduct } from '../product';

let _createSku = (ID: number, ProductID: number, Stock: number, Img: string, SalePrice: number, MarketPrice: number, Freight: number, Product: IProduct): ISku => {
  return { ID, ProductID, Stock, Img, SalePrice, MarketPrice, Freight, Product };
};
let getSku = (product: IProduct) => _createSku(1, 1, 99, `img/tj2.jpg`, 12000, 13000, 20000, product);

let createProduct = (
  ID: number,
  Name: string,
  Intro: string,
  Detail: string,
  Img: string,
  Saled: number,
  saleUserId: number,
  TimeCreated: number,
  status: number,
  TimeSale: number,
  TimeShelf: number,
  CategoryID: number): IProduct => {
  return { ID, Name, Img, Intro, Detail, Saled, ForSale: !!status, TimeCreated, TimeSale, TimeShelf, CategoryID };
};
let getProduct = (): IProduct =>
  createProduct(
    1,
    'snoy tv',
    'tv introduction',
    'tv detail',
    `/img/tj1.jpg`,
    50, 0, 0, 1, 0, 0, 1);

let getCartItem = (sku: ISku): ICartItem => ({
  ID: 1,
  Img: '',
  Name: '',
  Type: 'XXL 黑色', // sku attrs
  Price: 100000,
  Quantity: 10,
  CreatedAt: 123456,
  Sku: sku,
});

describe('CartService', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    CartService
  ]);


  it('should init cart item without sku', inject([CartService], (service) => {
    let item = getCartItem(null);
    service.initItem(item);

    expect(item.invalid).toBeTruthy();
    expect(item.checked).toBeFalsy();
  }));

  it('should init cart item without product', inject([CartService], (service) => {
    let item = getCartItem(getSku(null));
    service.initItem(item);

    expect(item.invalid).toBeTruthy();
    expect(item.checked).toBeFalsy();
    expect(item.Name).toBe('');
    expect(item.Img).toBe('img/tj2.jpg');
  }));

  it('should init cart item with product', inject([CartService], (service) => {
    let item = getCartItem(getSku(getProduct()));
    service.initItem(item);

    expect(item.invalid).toBeFalsy();
    expect(item.checked).toBeTruthy();
    expect(item.Name).toBe('snoy tv');
    expect(item.Img).toBe('img/tj2.jpg');
  }));

});
