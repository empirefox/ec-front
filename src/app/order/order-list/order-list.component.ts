import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { constMap, IOrder, OrderService } from '../../core';

const views = {
  all: 1,
  checkout: 1,
  receipted: 1,
  returned: 1,
};

const state = constMap.OrderState;

@Component({
  styleUrls: ['./order-list.css'],
  templateUrl: './order-list.html',
})
export class OrderListComponent implements OnInit {

  all: IOrder[];
  checkout: IOrder[];
  receipted: IOrder[];
  returned: IOrder[];

  allFiltered: IOrder[];
  checkoutFiltered: IOrder[];
  receiptedFiltered: IOrder[];
  returnedFiltered: IOrder[];

  current: IOrder[];

  _filter: string;
  _view: string = 'all';

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.view = this.route.snapshot.queryParams['view'];
    this.orderService.getOrders(false).take(1).subscribe(orders => this.setOrders(orders));
  }

  get view() { return this._view; }
  set view(view: string) {
    if (views[view]) {
      this._view = view;
      this.current = this[view + 'Filtered'];
    }
  }

  get filter() { return this._filter; }
  set filter(filter: string) {
    if (this._filter !== filter) {
      this._filter = filter;
      this.setFiltered();
    }
  }

  onScroll(next: boolean) {
    this.orderService.getOrders(next).subscribe(orders => this.setOrders(orders));
  }

  trackByItems(index: number, item: IOrder) { return item.ID; }

  private setOrders(orders: IOrder[]) {
    if (!orders) {
      return;
    }
    this.all = orders;
    this.checkout = orders.filter(order => order.State === state.TOrderStateNopay);
    this.receipted = orders.filter(order => order.State === state.TOrderStateCompleted);
    this.returned = orders.filter(order =>
      order.State === state.TOrderStateReturnStarted ||
      order.State === state.TOrderStateReturning ||
      order.State === state.TOrderStateReturned,
    );

    this.setFiltered();
  }

  private setFiltered() {
    this.allFiltered = this.doFilter(this.all);
    this.checkoutFiltered = this.doFilter(this.checkout);
    this.receiptedFiltered = this.doFilter(this.receipted);
    this.returnedFiltered = this.doFilter(this.returned);
    this.view = this.view;
  }

  private doFilter(src: IOrder[]): IOrder[] {
    let filter = this.filter;
    return !filter ? src : src.filter(order => {
      return (filter.length > 5 && !!order.CreatedAt.toString().match(filter)) || order.Items.some(item => !!item.Name.match(filter));
    });
  }
}
