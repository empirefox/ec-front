import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { Header1Component } from '../../header-bar';
import { IOrder, OrderService, LocalOrderService, LocalOrdersService } from '../../core';
import { OrderListItemComponent } from './order-list-item.component';

@Component({
  styles: [require('./order-list.css')],
  template: require('./order-list.html'),
  directives: [Header1Component, OrderListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {

  filtered: IOrder[];
  orders: IOrder[] = [];

  all: IOrder[];
  checkout: IOrder[];
  receipted: IOrder[];
  returned: IOrder[];

  _filter: string;

  private sub: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private localOrdersService: LocalOrdersService) { }

  ngOnInit() {
    this.view = this.router.routerState.snapshot.queryParams['view'];
    this.orderService.getOrders().take(1).subscribe(orders => this.localOrdersService.publish(orders));
    this.sub = this.localOrdersService.src$.subscribe(this.setOrders);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  set view(view: string) {
    this.setCurrent(this[view] || this.all);
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
  }

  private doFilter(filter: string) {
    this.filtered = !filter ? this.orders : this.orders.filter(order => {
      return (filter.length > 5 && !!order.TrackingNumber.match(filter)) || order.Items.some(item => !!item.Name.match(filter));
    });
  }

}
