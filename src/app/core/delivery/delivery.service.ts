import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as groupBy from 'lodash/groupBy';
import { URLS } from '../profile';
import { RetryHttp } from '../user';
import { IDelivery } from './delivery';

@Injectable()
export class DeliveryService {

  constructor(private http: RetryHttp) { }

  query(orderId: number): Observable<IDelivery> {
    return this.http.get(URLS.Delivery(orderId)).map(res => this.initItems(<IDelivery>res.json()));
  }

  private initItems(result: IDelivery): IDelivery {
    result.data = result.data || [];
    result.data.forEach(item => {
      let datetime = item.time.split(' ');
      item.date = datetime[0].replace(new Date().getFullYear() + '-', '');
      item.second = datetime[1];
    });

    let itemsByDate = groupBy(result.data, item => item.date);
    result.days = Object.keys(itemsByDate).
      map(date => ({ date: date, items: itemsByDate[date] })).
      sort((b, a) => a.date.localeCompare(b.date));
    return result;
  }

}
