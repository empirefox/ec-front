import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { Header1Component } from '../../header-bar';
import { IOrder, OrderService, LocalOrderService, LocalOrdersService } from '../../core';
import { OrderListItemComponent } from './order-list-item.component';

const views = {
  all: 1,
  checkout: 1,
  receipted: 1,
  returned: 1,
};

@Component({
  styles: [require('./order-list.css')],
  template: require('./order-list.html'),
  directives: [Header1Component, OrderListItemComponent],
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
    private cd: ChangeDetectorRef,
    private router: Router,
    private orderService: OrderService,
    private localOrdersService: LocalOrdersService) { }

  ngOnInit() {
    this.view = this.router.routerState.snapshot.queryParams['view'];
    this.sub = this.localOrdersService.src$.subscribe(orders => this.setOrders(orders));
    this.orderService.getOrders().take(1).subscribe(orders => this.localOrdersService.publish(orders));
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

  private setOrders(orders: IOrder[]) {
    this.all = orders;
    this.checkout = orders.filter(order => order.State === 'checkout');
    this.receipted = orders.filter(order => order.State === 'receipted');
    this.returned = orders.filter(order => order.State === 'returned');
    this.setCurrent(this[this.view]);
  }

  private doFilter(filter: string) {
    this.filtered = !filter ? this.orders : this.orders.filter(order => {
      return (filter.length > 5 && !!order.TrackingNumber.match(filter)) || order.Items.some(item => !!item.Name.match(filter));
    });
  }

}
