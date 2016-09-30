import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { constMap, IOrder, OrderService } from '../../core';

const views = {
  all: 1,
  checkout: 1,
  receipted: 1,
  returned: 1,
};

const state = constMap.OrderState;

@Component({
  styles: [require('./order-list.css')],
  template: require('./order-list.html'),
})
export class OrderListComponent implements OnInit {

  filtered: IOrder[];
  orders: IOrder[] = [];

  all: IOrder[];
  checkout: IOrder[];
  receipted: IOrder[];
  returned: IOrder[];

  _filter: string;
  _view: string = 'all';

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.view = this.route.snapshot.queryParams['view'];
    this.orderService.getOrders(false).take(1).subscribe(orders => this.orders = orders);
  }

  get view() { return this._view; }
  set view(view: string) {
    if (views[view]) {
      this._view = view;
      this.setCurrent(this[view]);
    }
  }

  get filter() { return this._filter; }
  set filter(filter: string) {
    if (this._filter !== filter) {
      this._filter = filter;
      this.doFilter(filter);
    }
  }

  setCurrent(orders: IOrder[]) {
    if (this.orders !== orders) {
      this.orders = orders;
      this.doFilter(this.filter);
    }
  }

  onScroll(next: boolean) {
    this.orderService.getOrders(next).subscribe(orders => this.orders = orders);
  }

  trackByItems(index: number, item: IOrder) { return item.ID; }

  private setOrders(orders: IOrder[]) {
    this.all = orders;
    this.checkout = orders.filter(order => order.State === state.TOrderStateNopay);
    this.receipted = orders.filter(order => order.State === state.TOrderStateCompleted);
    this.returned = orders.filter(order =>
      order.State === state.TOrderStateReturnStarted ||
      order.State === state.TOrderStateReturning ||
      order.State === state.TOrderStateReturned,
    );
    this.setCurrent(this[this.view]);
  }

  private doFilter(filter: string) {
    this.filtered = !filter ? this.orders : this.orders.filter(order => {
      return (filter.length > 5 && !!order.CreatedAt.toString().match(filter)) || order.Items.some(item => !!item.Name.match(filter));
    });
  }
}
