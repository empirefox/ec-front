import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { stringify } from 'querystringify';
import { URLS, CommonQuery } from '../profile';
import { createdAtSortor, splitToParents } from '../util';
import { RetryHttp } from '../user';
import { IWxPayArgs, MoneyService } from '../money';
import { ISku, IEvalItem } from '../product';
import {
  IOrder, IOrderItem,
  ICheckoutPayload, IOrderPayPayload,
  IOrderWxPayPayload,
  IOrderChangeStatePayload,
  IOrdersResponse,
} from './order';
import { ICheckout, ICheckoutItem, toPayload, toOnePayload } from './checkout';

const splitOrdersOptions = { idInParent: 'ID', parentIdInArray: 'OrderID', childrenInParent: 'Items' };

@Injectable()
export class OrderService {

  private _items: Observable<IOrder[]> = null;
  private _current: Observable<IOrder> = null;
  private _querying = false;

  private _checkoutItemCache: ICheckoutItem;
  private _orderFromCheckoutCache: IOrder;

  constructor(
    private http: RetryHttp,
    private moneyService: MoneyService) { }

  getCheckoutItemCache() { return this._checkoutItemCache; }
  setCheckoutItemCache(cache: ICheckoutItem) { this._checkoutItemCache = cache; }
  clearCheckoutItemCache() { this._checkoutItemCache = null; }

  getOrderFromCheckoutCache() { return this._orderFromCheckoutCache; }
  setOrderFromCheckoutCache(cache: IOrder) { this._orderFromCheckoutCache = cache; }

  // with items
  checkout(checkout: ICheckout): Observable<IOrder> {
    let url = checkout.normal ? URLS.ORDER_CHECKOUT : URLS.ORDER_CHECKOUT_ONE;
    let payload = (checkout.normal ? toPayload : toOnePayload)(checkout);
    return this.http.post(url, JSON.stringify(payload)).flatMap(res => {
      let order = <IOrder>res.json();
      if (this._items) {
        return this._items.map(items => {
          items.unshift(order);
          return order;
        });
      }
      return Observable.of(order);
    });
  }

  changeState(order: IOrder, state: number): Observable<IOrder> {
    let payload: IOrderChangeStatePayload = { ID: order.ID, State: state };
    return this.http.post(URLS.ORDER_STATE, JSON.stringify(payload)).map(res => this._assign(order, res.json()));
  }

  evalOrder(order: IOrder, itemEval: IEvalItem, itemId?: number): Observable<IOrder> {
    let options = itemId ? { search: new URLSearchParams(`item=${itemId}`) } : null;
    return this.http.post(URLS.OrderEval(order.ID), JSON.stringify(itemEval), options).
      map(res => Object.assign(order, res.json()));
  }

  pay(order: IOrder, key: string): Observable<IOrder> {
    let pay: IOrderPayPayload = {
      Key: key,
      OrderID: order.ID,
      Amount: order.PayPoints || order.PayAmount,
      IsPoints: !!order.PayPoints,
    };
    return this.http.post(URLS.ORDER_PAY, JSON.stringify(pay)).map(res => this._assign(order, res.json()));
  }

  wxPay(order: IOrder): Observable<IOrder> {
    if (order.PayPoints) {
      return Observable.throw<IOrder>('Points order');
    }
    let pay: IOrderWxPayPayload = { OrderID: order.ID };
    return this.http.post(URLS.ORDER_WX_PAY, JSON.stringify(pay)).
      flatMap(res => this.moneyService.requestPay(<IWxPayArgs>res.json())).
      flatMap(_ => this.http.get(URLS.PaiedOrder(order.ID))).
      map(res => this._assign(order, res.json()));
  }

  clearCache() {
    this._items = null;
  }

  getOrders(next: boolean): Observable<IOrder[]> {
    if (!this._items) {
      this._items = this._query({ sz: 30, ob: 'CreatedAt.desc' }).publishReplay(1).refCount();
      return this._items;
    }

    if (this._querying) {
      return this._items;
    }

    this._items = this._items.flatMap(exist => {
      if (exist && exist.length) {
        let filter = next ?
          `CreatedAt.lt.${exist[exist.length - 1].CreatedAt}` :
          `CreatedAt.gt.${exist[0].CreatedAt}`;
        return this._query({ sz: 30, ob: 'CreatedAt.desc', ft: filter }).
          flatMap(items => Observable.of(items.length ? (next ? [...exist, ...items] : [...items, ...exist]) : exist));
      } else {
        return this._query({ sz: 30, ob: 'CreatedAt.desc' });
      }
    });

    this._items = this._items.publishReplay(1).refCount();
    return this._items;
  }

  getOrder(id: number): Observable<IOrder> {
    return !id ? Observable.of(null) :
      (this._items || Observable.of([])).flatMap(items => {
        let item = items.find(i => i.ID === id);
        return item ? Observable.of(item) : this._queryOne(id);
      });
  }

  setCurrent(order: IOrder) {
    this._current = Observable.of(order);
  }

  private _queryOne(id: number): Observable<IOrder> {
    this._current = (this._current || Observable.of(<IOrder>{ ID: 0 })).flatMap(current => {
      return current && current.ID === id ? Observable.of(current) :
        this.http.get(URLS.Order(id)).map(res => <IOrder>res.json());
    });
    this._current = this._current.publishReplay(1).refCount();
    return this._current;
  }

  private _query(query: CommonQuery): Observable<IOrder[]> {
    this._querying = true;
    return this.http.get(URLS.ORDER_LIST, { search: stringify(query) }).
      map(res => {
        this._querying = false;
        return this.equipOrders(res.json() || {});
      }).catch((err, caught) => {
        this._querying = false;
        return caught;
      }).publishReplay(1).refCount();
  }

  private _assign(dest: IOrder, src: IOrder): IOrder {
    return Object.assign(dest, src, { Items: dest.Items });
  }

  private equipOrders(res: IOrdersResponse): IOrder[] {
    let orders = res.Orders || [];
    let items = res.Items || [];

    splitToParents(orders, items, splitOrdersOptions);
    return orders.sort(createdAtSortor);
  }

}
