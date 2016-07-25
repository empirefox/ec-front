import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalOrderService, LocalOrdersService } from './local.service';
import { OrderService } from './order.service';

@Injectable()
export class OrderContextService {

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private itemService: LocalOrderService,
    private itemsService: LocalOrdersService) { }

  asObservable() {
    return this.route.params.flatMap(params => this.getOrder(+params['id']));
  }

  getOrder(id: number) {
    if (this.itemService.published) {
      return this.itemService.src$.take(1).flatMap(item => {
        return item && item.ID === id ? Observable.of(item) : this.getFromItemsOrRequest(id);
      });
    }
    return this.getFromItemsOrRequest(id);
  }

  private getFromItemsOrRequest(id: number) {
    if (this.itemsService.published) {
      return this.itemsService.src$.take(1).flatMap(items => {
        let item = items && items.find(item => item.ID === id);
        return item ? Observable.of(item).map(this.itemService.publish) : this.request(id);
      });
    }
    return this.request(id);
  }

  private request(id: number) {
    return this.orderService.getOrder(id).map(this.itemService.publish);
  }

}
