import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { IWxPayArgs, MoneyService } from '../money';
import { ISku, IEvalItem } from '../product';
import { IOrder, IOrderItem, ICheckoutPayload, IOrderPayPayload, IOrderWxPayPayload, IOrderChangeStatePayload, IEvalResponse } from './order';
import { ICheckout, ICheckoutItem, toPayload } from './checkout';

@Injectable()
export class OrderService {

  _checkoutItemCache: ICheckoutItem;

  constructor(
    private http: AuthHttp,
    private moneyService: MoneyService) { }

  getCheckoutItemCache() { return this._checkoutItemCache; }
  setCheckoutItemCache(cache: ICheckoutItem) { this._checkoutItemCache = cache; }
  clearCheckoutItemCache() { this._checkoutItemCache = null; }

  // with items
  checkout(checkout: ICheckout): Observable<IOrder> {
    return this.http.post(URLS.ORDER_CHECKOUT, JSON.stringify(toPayload(checkout))).map(res => <IOrder>res.json());
  }

  changeState(orderId: number, state: number): Observable<IOrder> {
    let payload: IOrderChangeStatePayload = { ID: orderId, State: state };
    return this.http.post(URLS.ORDER_STATE, JSON.stringify(payload)).map(res => <IOrder>res.json());
  }

  // with items
  getOrders(): Observable<IOrder[]> {
    return this.http.get(URLS.ORDER_LIST).map(res => <IOrder[]>res.json() || []);
  }

  // with items
  getOrder(id: number): Observable<IOrder> {
    return this.http.get(URLS.Order(id)).map(res => <IOrder>res.json());
  }

  evalOrder(orderId: number, itemId: number, itemEval: IEvalItem): Observable<IEvalResponse> {
    let options = itemId ? { search: new URLSearchParams(`item=${itemId}`) } : null;
    return this.http.post(URLS.OrderEval(orderId), JSON.stringify(itemEval), options).
      map(res => <IEvalResponse>res.json());
  }

  pay(order: IOrder, key: string): Observable<IOrder> {
    let pay: IOrderPayPayload = {
      Key: key,
      OrderID: order.ID,
      Amount: order.PayPoints || order.PayAmount,
      IsPoints: !!order.PayPoints,
    };
    return this.http.post(URLS.ORDER_PAY, JSON.stringify(pay)).map(res => <IOrder>res.json());
  }

  wxPay(order: IOrder, amount: number): Observable<IOrder> {
    if (order.PayPoints) {
      return Observable.throw<IOrder>('Points order');
    }
    let pay: IOrderWxPayPayload = { OrderID: order.ID };
    return this.http.post(URLS.ORDER_WX_PAY, JSON.stringify(pay)).
      flatMap(res => this.moneyService.requestPay(<IWxPayArgs>res.json())).
      flatMap(_ => this.http.get(URLS.PaiedOrder(order.ID))).
      map(res => <IOrder>res.json());
  }

}
