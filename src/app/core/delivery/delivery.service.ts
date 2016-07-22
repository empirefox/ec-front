import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { groupBy } from 'lodash';
import { URLS } from '../profile';
import { IDelivery, IDeliveryItem } from './delivery';

@Injectable()
export class DeliveryService {

  constructor(private http: Http) { }

  query(orderId: number): Observable<IDelivery> {
    return this.http.get(URLS.Delivery(orderId)).map(res => {
      let result = <IDelivery>res.json();
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

    });
  }

}
