import { Component, Optional, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import { IOrder, OrderService, LocalOrderService, LocalOrdersService } from '../../core';
import { Header1Component } from '../../header-bar';
import { OrderDetailComponent } from './order-detail.component';

@Component({
  template: require('./order-detail-page.html'),
  directives: [Header1Component, OrderDetailComponent],
})
export class OrderDetailPageComponent implements OnInit {

  order: IOrder;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    @Optional() private localOrderService: LocalOrderService,
    @Optional() private localOrdersService: LocalOrdersService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.sub = this.orderService.getLocalOrRequest(id, this.localOrderService, this.localOrdersService).
      subscribe(order => this.order = order);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
