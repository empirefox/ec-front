import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import groupBy from 'lodash/groupBy';
import { URLS } from '../profile';
import { IDelivery, IDeliveryItem } from './delivery';

@Injectable()
export class DeliveryService {

  constructor(private http: AuthHttp) { }

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
