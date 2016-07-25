import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { encode } from 'jwt-simple';
import { URLS } from '../profile';
import { nonce } from '../util';
import { IPayArgs, MoneyService, ITradeState } from '../money';
import { ISku } from '../product';
import { IOrder, IOrderItem, ICheckoutPayload, IOrderPayClaims } from './order';
import { ICheckout, ICheckoutItem, toPayload } from './checkout';

@Injectable()
export class OrderService {

  _checkoutItemCache: ICheckoutItem;

  constructor(
    private http: Http,
    private moneyService: MoneyService) { }

  getCheckoutItemCache() { return this._checkoutItemCache; }
  setCheckoutItemCache(cache: ICheckoutItem) { this._checkoutItemCache = cache; }
  clearCheckoutItemCache() { this._checkoutItemCache = null; }

  // return OrderID
  checkout(checkout: ICheckout): Observable<number> {
    return this.http.post(URLS.ORDER_CHECKOUT, JSON.stringify(toPayload(checkout))).map(res => <number>res.json());
  }

  changeState(orderId: number, state: string): Observable<IOrder> {
    return this.http.post(URLS.Order(orderId), JSON.stringify({ OrderID: orderId, State: state })).map(res => <IOrder>res.json());
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get(URLS.ORDER_LIST).map(res => <IOrder[]>res.json());
  }

  getOrder(id: number): Observable<IOrder> {
    return this.http.get(URLS.Order(id)).map(res => <IOrder>res.json());
  }

  pay(orderId: number, amount: number, key: string): Observable<IOrder> {
    let iat = Math.floor(Date.now() / 1000);
    let n = nonce(32);
    let pay: IOrderPayClaims = {
      UserID: 0, // TODO use fact user id
      Amount: amount,
      OrderID: orderId,
      Nonce: n,
      iat: iat,
      exp: iat + 300, // 5 min
    };
    return this.http.post(URLS.ORDER_PAY, encode(pay, key, 'HS256')).map(res => <IOrder>res.json());
  }

  wxPay(orderId: number, amount: number): Observable<IOrder> {
    return this.http.post(URLS.ORDER_WX_PAY, JSON.stringify({
      UserID: 0,
      Amount: amount,
      OrderID: orderId,
    })).flatMap(res => this.moneyService.requestPay(<IPayArgs>res.json())).
      flatMap(_ => this.http.get(URLS.Order(orderId))).
      map(res => <IOrder>res.json());
  }

}
